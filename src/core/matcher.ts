import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import {
    ActivitiesConfig,
    AssignableActivity,
    AssignableParticipant,
    ParticipantsConfig,
    validateModel
} from './model'
import _range from 'lodash/range'

type FillToMinimumConfiguration = {
    readonly priority: number
    readonly index: number
}

export type MatchResult = {
    participants: AssignableParticipant[]
    activities: AssignableActivity[]
}

export function match(
    participantsConfig: ParticipantsConfig,
    activitiesConfig: ActivitiesConfig
): MatchResult {
    validateModel(participantsConfig.participants, activitiesConfig.activities)

    const participantsToMatch = (
        participantsConfig.shuffleBeforeMatch
            ? shuffle(participantsConfig.participants)
            : participantsConfig.participants
    ).map(
        (participant) =>
            new AssignableParticipant(participant, participantsConfig)
    )
    const activitiesToMatch = (
        activitiesConfig.shuffleBeforeMatch
            ? shuffle(activitiesConfig.activities)
            : activitiesConfig.activities
    ).map((activity) => new AssignableActivity(activity, participantsConfig))

    tryToMatch(participantsToMatch, activitiesToMatch, participantsConfig)

    return { participants: participantsToMatch, activities: activitiesToMatch }
}

const tryToMatch = (
    participants: AssignableParticipant[],
    activities: AssignableActivity[],
    participantsConfig: ParticipantsConfig
): void => {
    const assignableActivities = getAssignableActivities(activities)
    const totalNumPriorities = participantsConfig.prioritiesPerPerson

    for (const activity of assignableActivities) {
        for (const execution of _range(
            1,
            participantsConfig.activitiesPerPerson + 1
        )) {
            const participantsInOrder = getParticipantsInPriorityOrder(
                participants,
                activity,
                totalNumPriorities
            )
            console.log(activity.title)
            const minimalPriority = getMinimalPriorityToFillToMinimum(
                activity,
                participantsInOrder,
                totalNumPriorities
            )
            console.log(
                `Minimal priority to fill to minimum ${
                    minimalPriority.priority + 1
                }, index ${minimalPriority.index}`
            )
            for (const priority of range(totalNumPriorities)) {
                console.log(
                    `Prio ${priority + 1}: ${participantsInOrder[priority].length}`
                )
            }
            tryToFillToMinimum(
                activity,
                participantsInOrder,
                minimalPriority,
                execution
            )
        }
    }

    console.log('Second round')
    for (const execution of _range(
        1,
        participantsConfig.activitiesPerPerson + 1
    )) {
        for (const activity of sortByDeltaToMinimum(
            assignableActivities,
            execution
        )) {
            const participantsInOrder = getParticipantsInPriorityOrder(
                participants,
                activity,
                totalNumPriorities
            )
            const delta =
                activity.minimum - activity.participants[execution].length
            const participantsFlat = participantsInOrder.flat()

            console.log(`Try to fill delta ${delta} for ${activity.title}`)

            while (
                participantsFlat.length > 0 &&
                activity.minimum - activity.participants[execution].length > 0
            ) {
                const participant = participantsFlat.shift()
                if (participant.canBeAssignedTo(activity, execution)) {
                    activity.assignParticipant(participant, execution)
                }
            }
        }
    }

    console.log('final round')

    for (const activity of sortByUnmatchedPriorities(
        assignableActivities,
        participants,
        totalNumPriorities
    )) {
        for (const execution of _range(
            1,
            participantsConfig.activitiesPerPerson + 1
        )) {
            const participantsInOrder = getParticipantsInPriorityOrder(
                participants,
                activity,
                totalNumPriorities
            )
            for (const priority of range(totalNumPriorities)) {
                for (const index of range(
                    participantsInOrder[priority].length
                )) {
                    const participant = participantsInOrder[priority].shift()
                    if (participant.canBeAssignedTo(activity, execution)) {
                        activity.assignParticipant(participant, execution)
                    }
                }
            }
        }
    }
}

const getAssignableActivities = (
    activities: AssignableActivity[]
): AssignableActivity[] => activities.filter((activity) => activity.limit > 0)

export const getParticipantsInPriorityOrder = (
    participants: AssignableParticipant[],
    activity: AssignableActivity,
    totalNumOfPriorities: number
): AssignableParticipant[][] => {
    const participantsByPriority: AssignableParticipant[][] = range(
        totalNumOfPriorities
    ).map(() => [])

    for (const participant of participants) {
        participantsByPriority.forEach((priority, index) => {
            if (participant.priorities[index] === activity.id) {
                participantsByPriority[index].push(participant)
            }
        })
    }

    return participantsByPriority
}

const getUnmatchedParticipants = (
    participants: AssignableParticipant[]
): AssignableParticipant[] =>
    participants.filter((participant) => participant.needsMoreActivities())

const getActivitiesWithMinimumReached = (
    activities: AssignableActivity[],
    execution: number
): AssignableActivity[] =>
    activities.filter(
        (activity) =>
            activity.participants[execution].length >= activity.minimum
    )

export const getMinimalPriorityToFillToMinimum = (
    activity: AssignableActivity,
    participantsInOrder: AssignableParticipant[][],
    totalNumPriorities: number
): FillToMinimumConfiguration => {
    let currentPriority = 0
    const assignedParticipants: AssignableParticipant[] = []
    const participantsInOrderCopy = participantsInOrder.map((participants) =>
        participants.slice(0)
    )
    while (
        assignedParticipants.length < activity.minimum &&
        participantsInOrderCopy.flat().length > 0 &&
        currentPriority < totalNumPriorities
    ) {
        if (
            participantsInOrderCopy[currentPriority].length === 0 &&
            currentPriority < totalNumPriorities
        ) {
            currentPriority = currentPriority + 1
        }

        assignedParticipants.push(
            participantsInOrderCopy[currentPriority].shift()
        )

        if (
            participantsInOrderCopy.flat().length === 0 &&
            assignedParticipants.length < activity.minimum
        ) {
            return { priority: -1, index: -1 }
        }

        if (assignedParticipants.length === activity.minimum) {
            break
        }
    }
    const index =
        participantsInOrder[currentPriority].length -
        participantsInOrderCopy[currentPriority].length -
        1
    return { priority: currentPriority, index }
}

export const tryToFillToMinimum = (
    activity: AssignableActivity,
    participantsInOrder: AssignableParticipant[][],
    minimalPriority: FillToMinimumConfiguration,
    execution: number
): void => {
    for (const priority of range(minimalPriority.priority)) {
        for (const index of range(participantsInOrder[priority].length)) {
            const participant = participantsInOrder[priority].shift()
            if (participant.canBeAssignedTo(activity, execution)) {
                activity.assignParticipant(participant, execution)
            }
        }
    }
    for (const index of range(minimalPriority.index + 1)) {
        const participant =
            participantsInOrder[minimalPriority.priority].shift()
        if (participant.canBeAssignedTo(activity, execution)) {
            activity.assignParticipant(participant, execution)
        }
    }
}

export const sortByDeltaToMinimum = (
    activities: AssignableActivity[],
    execution: number
): AssignableActivity[] => {
    return activities.sort((activity1, activity2) => {
        const delta1 =
            activity1.minimum - activity1.participants[execution].length
        const delta2 =
            activity2.minimum - activity2.participants[execution].length
        return delta2 - delta1
    })
}

const sortByUnmatchedPriorities = (
    activities: AssignableActivity[],
    participants: AssignableParticipant[],
    totalNumOfPriorities: number
): AssignableActivity[] => {
    return activities.sort((activity1, activity2) => {
        for (const priority of range(totalNumOfPriorities)) {
            const participantsInOrder1 = getParticipantsInPriorityOrder(
                participants,
                activity1,
                totalNumOfPriorities
            )
            const participantsInOrder2 = getParticipantsInPriorityOrder(
                participants,
                activity2,
                totalNumOfPriorities
            )
            if (
                getUnmatchedParticipants(participantsInOrder2[priority])
                    .length >
                getUnmatchedParticipants(participantsInOrder1[priority]).length
            ) {
                return 1
            } else if (
                getUnmatchedParticipants(participantsInOrder1[priority])
                    .length >
                getUnmatchedParticipants(participantsInOrder2[priority]).length
            ) {
                return -1
            }
        }
        return 0
    })
}
