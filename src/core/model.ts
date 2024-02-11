import _range from 'lodash/range'

export type ActivitiesConfig = {
    readonly activities: Activity[]
    readonly shuffleBeforeMatch: boolean
}

export type ParticipantsConfig = {
    readonly participants: Participant[]
    readonly shuffleBeforeMatch: boolean
    readonly activitiesPerPerson: number
    readonly prioritiesPerPerson: number
    readonly otherAttributesColumns: string[]
}

export type Activity = {
    readonly id: string
    readonly title: string
    readonly limit: number
    readonly minimum: number
}

export type Participant = {
    readonly id: string
    readonly priorities: string[]
    readonly otherAttributes?: string[]
}

export class AssignableParticipant {
    // TODO maybe store priority here, too. we keep resolving that all over the place..
    public activities: { activity: AssignableActivity; execution: number }[] =
        []

    constructor(
        private participant: Participant,
        private config: Pick<ParticipantsConfig, 'activitiesPerPerson'>
    ) {}

    get id() {
        return this.participant.id
    }

    get priorities() {
        return this.participant.priorities
    }

    get otherAttributes(): string[] {
        return this.participant.otherAttributes
    }

    assign(activity: AssignableActivity, execution: number) {
        if (!this.needsMoreActivities()) {
            throw new Error(
                'Participant has reached limit of activities per person'
            )
        }
        if (this.isAssignedTo(activity, execution)) {
            throw new Error('Participant is already assigned to this activity')
        }
        this.activities.push({ activity, execution })
    }

    isAssignedTo(activity: Activity, execution: number) {
        return this.activities.some(
            (assignedActivity) =>
                assignedActivity.activity.id === activity.id &&
                assignedActivity.execution === execution
        )
    }

    canBeAssignedTo(activity: AssignableActivity, execution: number): boolean {
        const anyOtherActivityInSameExecution = this.activities.some(
            (activity) => activity.execution === execution
        )
        const sameActivityInOtherExecution = this.activities.some(
            (value) => value.activity.id === activity.id
        )
        return (
            this.needsMoreActivities() &&
            !this.isAssignedTo(activity, execution) &&
            activity.isNotFull(execution) &&
            !anyOtherActivityInSameExecution &&
            !sameActivityInOtherExecution
        )
    }

    needsMoreActivities() {
        return this.activities.length < this.config.activitiesPerPerson
    }

    otherAssignedActivities(
        activity: AssignableActivity
    ): { activity: AssignableActivity; priority: number }[] {
        return this.activities
            .filter((value) => value.activity.id !== activity.id)
            .map(({ activity, execution }) => ({
                activity,
                priority: this.priorities.indexOf(activity.id)
            }))
    }

    otherPossiblePriorities(
        activities: AssignableActivity[]
    ): { activity: AssignableActivity; priority: number; execution: number }[] {
        return this.priorities
            .map((priority) =>
                activities.find((activity) => activity.id === priority)
            )
            .map((activity) =>
                _range(1, this.config.activitiesPerPerson + 1).map(
                    (execution) => ({
                        execution,
                        activity,
                        canBeAssigned: this.canBeAssignedTo(
                            activity,
                            execution
                        ),
                        priority: this.priorities.indexOf(activity.id)
                    })
                )
            )
            .flat()
            .filter(({ canBeAssigned }) => canBeAssigned)
    }

    score(): number {
        const assignedActivitiesScore = this.activities
            .map((assignedActivity) =>
                this.priorities.indexOf(assignedActivity.activity.id) + 1
            )
            .reduce((sum, priority) => sum + priority, 0)

        const missingActivitiesScore =
            (this.config.activitiesPerPerson - this.activities.length) *
            this.priorities.length

        return assignedActivitiesScore + missingActivitiesScore
    }
}

export class AssignableActivity {
    public readonly participants: Record<number, AssignableParticipant[]> = {}

    constructor(
        private activity: Activity,
        participantsConfig: Pick<ParticipantsConfig, 'activitiesPerPerson'>
    ) {
        _range(1, participantsConfig.activitiesPerPerson + 1).forEach(
            (execution) => (this.participants[execution] = [])
        )
    }

    *allParticipants(): Generator<AssignableParticipant> {
        for (const [_, participants] of Object.entries(this.participants)) {
            for (const participant of participants) {
                yield participant
            }
        }
    }

    participantsByExecution(execution: number): AssignableParticipant[] {
        return this.participants[execution] ?? []
    }

    participantsWithExecution(): {
        participant: AssignableParticipant
        execution: string
    }[] {
        return Object.entries(this.participants)
            .map(([execution, participants]) =>
                participants.map((participant) => ({
                    participant,
                    execution
                }))
            )
            .flat(2)
    }

    get id() {
        return this.activity.id
    }

    get minimum() {
        return this.activity.minimum
    }

    get limit() {
        return this.activity.limit
    }

    get title() {
        return this.activity.title
    }

    assignParticipant(participant: AssignableParticipant, execution: number) {
        if (!this.isNotFull(execution)) {
            throw new Error(`Activity title="${this.title} is full`)
        }
        if (
            this.participants[execution].some(
                (existingParticipant) =>
                    existingParticipant.id === participant.id
            )
        ) {
            throw new Error('Participant already in this activity')
        }

        this.participants[execution].push(participant)
        participant.assign(this, execution)
    }

    isNotFull(execution: number) {
        return this.participants[execution].length < this.limit
    }
}

type EntityTypes = 'Participant' | 'Activity'

export class NotUniqueError extends Error {
    constructor(
        public entityType: EntityTypes,
        public entityId: string,
        public propertyName: string,
        public propertyValue: string | number
    ) {
        super(
            `${propertyName}=${propertyValue} not unique for ${entityType} with id=${entityId}`
        )
        Object.setPrototypeOf(this, NotUniqueError.prototype)
    }
}

export class NotExistError extends Error {
    constructor(
        public entityType: EntityTypes,
        public id: string,
        public referrerType: EntityTypes,
        public referrerId: string
    ) {
        super(
            `${entityType} with id=${id} does not exist. Referred to by ${referrerType} with id=${referrerId}`
        )
        Object.setPrototypeOf(this, NotExistError.prototype)
    }
}

export const validateModel = (
    participants: Participant[],
    activities: Activity[]
): void => {
    assertUniqueActivityIds(activities)
    assertUniqueParticipantsIds(participants)
    assertUniquePrioritiesPerParticipant(participants)
    assertPrioritiesDoExist(participants, activities)
}

export function assertUniqueParticipantsIds(participants: Participant[]) {
    const idSet = new Set()
    participants.forEach((participant) => {
        if (idSet.has(participant.id)) {
            throw new NotUniqueError(
                'Participant',
                participant.id,
                'id',
                participant.id
            )
        } else {
            idSet.add(participant.id)
        }
    })
}

export function assertUniqueActivityIds(activities: Activity[]) {
    const idSet = new Set()
    activities.forEach((activity) => {
        if (idSet.has(activity.id)) {
            throw new NotUniqueError('Activity', activity.id, 'id', activity.id)
        } else {
            idSet.add(activity.id)
        }
    })
}

export function assertUniquePrioritiesPerParticipant(
    participants: Participant[]
) {
    participants.forEach((participant) => {
        const originalLength = participant.priorities.length
        const deduplicatedLength = new Set(participant.priorities).size
        if (originalLength !== deduplicatedLength) {
            throw new NotUniqueError(
                'Participant',
                participant.id,
                'priorities',
                participant.priorities.toString()
            )
        }
    })
}

export function assertPrioritiesDoExist(
    participants: Participant[],
    activities: Activity[]
) {
    const activityIds = activities.map((activity) => activity.id)
    participants.forEach((participant) => {
        participant.priorities.forEach((priority) => {
            if (!activityIds.find((activityId) => activityId === priority)) {
                throw new NotExistError(
                    'Activity',
                    priority,
                    'Participant',
                    participant.id
                )
            }
        })
    })
}
