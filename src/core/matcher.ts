import range from 'lodash/range'
import shuffle from 'lodash/shuffle'
import {
    ActivitiesConfig,
    AssignableActivity,
    AssignableParticipant,
    createAssignableActivity,
    createAssignableParticipant,
    ParticipantsConfig,
    validateModel
} from './model'

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
    ).map((participant) => createAssignableParticipant(participant))
    const activitiesToMatch = (
        activitiesConfig.shuffleBeforeMatch
            ? shuffle(activitiesConfig.activities)
            : activitiesConfig.activities
    ).map((activity) => createAssignableActivity(activity))

    tryToMatch(participantsToMatch, activitiesToMatch)

    return { participants: participantsToMatch, activities: activitiesToMatch }
}

const tryToMatch = (
    participants: AssignableParticipant[],
    activities: AssignableActivity[]
): void => {
    const assignableActivities = getAssignableActivities(activities)
    const totalNumPriorities = participants[0].priorities.length // TODO FIXME

    for (const activity of assignableActivities) {
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
        tryToFillToMinimum(activity, participantsInOrder, minimalPriority)
    }

    console.log('Second round')

    for (const activity of sortByDeltaToMinimum(assignableActivities)) {
        const participantsInOrder = getParticipantsInPriorityOrder(
            participants,
            activity,
            totalNumPriorities
        )
        const delta = activity.minimum - activity.participants.length
        const participantsFlat = participantsInOrder.flat()

        console.log(`Try to fill delta ${delta} for ${activity.title}`)

        while (
            participantsFlat.length > 0 &&
            activity.minimum - activity.participants.length > 0
        ) {
            const participant = participantsFlat.shift()
            if (!participant.assigned && activity.isNotFull()) {
                activity.assignParticipant(participant)
                participant.assigned = true
            } else {
                console.warn(`${participant.id} already matched!!`)
            }
        }
    }

    console.log('final round')

    for (const activity of sortByUnmatchedPriorities(
        assignableActivities,
        participants,
        totalNumPriorities
    )) {
        console.log(activity.title)
        const participantsInOrder = getParticipantsInPriorityOrder(
            participants,
            activity,
            totalNumPriorities
        )
        for (const priority of range(totalNumPriorities)) {
            for (const index of range(participantsInOrder[priority].length)) {
                const participant = participantsInOrder[priority].shift()
                if (!participant.assigned && activity.isNotFull()) {
                    activity.assignParticipant(participant)
                    participant.assigned = true
                } else {
                    console.warn(`${participant.id} already matched!!`)
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
    participants.filter((participant) => !participant.assigned)

const getActivitiesWithMinimumReached = (
    activities: AssignableActivity[]
): AssignableActivity[] =>
    activities.filter(
        (activity) => activity.participants.length >= activity.minimum
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
    minimalPriority: FillToMinimumConfiguration
): void => {
    for (const priority of range(minimalPriority.priority)) {
        for (const index of range(participantsInOrder[priority].length)) {
            const participant = participantsInOrder[priority].shift()
            if (!participant.assigned && activity.isNotFull()) {
                activity.assignParticipant(participant)
                participant.assigned = true
            } else {
                console.warn(`${participant.id} already matched!!`)
            }
        }
    }
    for (const index of range(minimalPriority.index + 1)) {
        const participant =
            participantsInOrder[minimalPriority.priority].shift()
        if (!participant.assigned && activity.isNotFull()) {
            activity.assignParticipant(participant)
            participant.assigned = true
        } else {
            console.warn(`${participant.id} already matched!!`)
        }
    }
}

export const sortByDeltaToMinimum = (
    activities: AssignableActivity[]
): AssignableActivity[] => {
    return activities.sort((activity1, activity2) => {
        const delta1 = activity1.minimum - activity1.participants.length
        const delta2 = activity2.minimum - activity2.participants.length
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
