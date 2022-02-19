export type ActivitiesConfig = {
    readonly activities: Activity[]
    readonly shuffleBeforeMatch: boolean
}

export type ParticipantsConfig = {
    readonly participants: Participant[]
    readonly shuffleBeforeMatch: boolean
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
}

type ActivityMixin = {
    readonly participants: Readonly<readonly Participant[]>
    assignParticipant(participant: AssignableParticipant): void
    isNotFull(): boolean
}

type ParticipantMixin = {
    readonly _assigned: boolean
    assigned: boolean
}

export type AssignableActivity = Activity & ActivityMixin
export type AssignableParticipant = Participant & ParticipantMixin

type EntityTypes = 'Participant' | 'Activity'

export const createAssignableActivity = (
    activity: Activity
): AssignableActivity => {
    return {
        ...activity,
        assignParticipant(participant: AssignableParticipant) {
            if (this.participants.length < this.limit) {
                this.participants.push(participant)
            } else {
                throw new Error(`Activity title="${this.title} is full`)
            }
        },
        isNotFull() {
            return this.participants.length < this.limit
        },
        participants: []
    }
}

export const createAssignableParticipant = (
    participant: Participant
): AssignableParticipant => {
    return {
        ...participant,
        _assigned: false,
        set assigned(assigned: boolean) {
            if (this._assigned && assigned) {
                throw Error(`Participant ${this.id} already assigned`)
            }
            this._assigned = assigned
        },
        get assigned(): boolean {
            return this._assigned
        }
    }
}

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
