import {
    match,
    getMinimalPriorityToFillToMinimum,
    getParticipantsInPriorityOrder,
    sortByDeltaToMinimum
} from './matcher'
import {
    AssignableActivity,
    AssignableParticipant,
    createAssignableActivity,
    createAssignableParticipant,
    validateModel
} from './model'

const newParticipant = ({
    id,
    priorities = []
}: Partial<AssignableParticipant>): AssignableParticipant =>
    createAssignableParticipant({
        id,
        priorities
    })

const newActivity = ({
    id,
    minimum = 10,
    limit = 10
}: Partial<AssignableActivity>): AssignableActivity => {
    return createAssignableActivity({ id, title: '', minimum, limit })
}

describe('sortByDeltaToMinimum', () => {
    it('must return activitys ordered by how many participants are missing to reach its minimum', () => {
        const activity1 = newActivity({
            id: '1',
            minimum: 3,
            limit: 0,
            participants: [newParticipant({ id: '1' })]
        })
        const activity2 = newActivity({
            id: '2',
            minimum: 2,
            limit: 0,
            participants: [newParticipant({ id: '2' })]
        })
        const activity3 = newActivity({
            id: '3',
            minimum: 1,
            limit: 0,
            participants: [newParticipant({ id: '2' })]
        })
        const sorted = sortByDeltaToMinimum([activity2, activity3, activity1])
        expect(sorted[0]).toStrictEqual(activity1)
        expect(sorted[1]).toStrictEqual(activity2)
        expect(sorted[2]).toStrictEqual(activity3)
    })
})

describe('getMinimalPriorityToFillToMinimum', () => {
    it('must return the priority and index of participant needed to fill activity to the minimum', () => {
        const activity = newActivity({ id: '1', minimum: 3 })
        const activity2 = newActivity({ id: '2' })
        const activity3 = newActivity({ id: '3' })
        const participant1 = newParticipant({
            id: '1',
            priorities: ['1', '2', '3']
        })
        const participant2 = newParticipant({
            id: '2',
            priorities: ['2', '1', '3']
        })
        const participant3 = newParticipant({
            id: '3',
            priorities: ['3', '1', '2']
        })
        const participant4 = newParticipant({
            id: '4',
            priorities: ['2', '3', '1']
        })
        const participant5 = newParticipant({
            id: '5',
            priorities: ['3', '2', '1']
        })
        const participantsInOrder = [
            [participant1],
            [participant2, participant3],
            [participant4, participant5]
        ]
        validateModel(participantsInOrder.flat(), [
            activity,
            activity2,
            activity3
        ])
        expect(
            getMinimalPriorityToFillToMinimum(activity, participantsInOrder, 3)
        ).toStrictEqual({ priority: 1, index: 1 })
    })

    it('must return priority and index = -1 if activity cannot be filled to minimum with the given priorities', () => {
        const activity = newActivity({ id: '1', limit: 3 })
        const activity2 = newActivity({ id: '2' })
        const activity3 = newActivity({ id: '3' })
        const participant1 = newParticipant({
            id: '1',
            priorities: ['1', '2', '3']
        })
        const participant2 = newParticipant({
            id: '2',
            priorities: ['2', '1', '3']
        })
        const participantsInOrder = [[participant1], [participant2], []]
        validateModel(participantsInOrder.flat(), [
            activity,
            activity2,
            activity3
        ])
        expect(
            getMinimalPriorityToFillToMinimum(activity, participantsInOrder, 3)
        ).toStrictEqual({ priority: -1, index: -1 })
    })
})

describe('getParticipantsInPriorityOrder', () => {
    it('must return array of arrays containing participants in order of the priority they have given for that activity', () => {
        const activity1 = newActivity({ id: '1' })
        const activity2 = newActivity({ id: '2' })
        const activity3 = newActivity({ id: '3' })
        const participant1 = newParticipant({
            id: '1',
            priorities: ['1', '2', '3']
        })
        const participant2 = newParticipant({
            id: '2',
            priorities: ['3', '2', '1']
        })
        const participant3 = newParticipant({
            id: '3',
            priorities: ['2', '3', '1']
        })
        const participant4 = newParticipant({
            id: '4',
            priorities: ['1', '3', '2']
        })
        const participant5 = newParticipant({
            id: '5',
            priorities: ['2', '3', '1']
        })
        const participant6 = newParticipant({
            id: '6',
            priorities: ['2', '1', '3']
        })
        const participants = [
            participant1,
            participant2,
            participant3,
            participant4,
            participant5,
            participant6
        ]
        validateModel(participants, [activity1, activity2, activity3])
        expect(
            getParticipantsInPriorityOrder(participants, activity1, 3)
        ).toStrictEqual([
            [participant1, participant4],
            [participant6],
            [participant2, participant3, participant5]
        ])
        expect(
            getParticipantsInPriorityOrder(participants, activity2, 3)
        ).toStrictEqual([
            [participant3, participant5, participant6],
            [participant1, participant2],
            [participant4]
        ])
        expect(
            getParticipantsInPriorityOrder(participants, activity3, 3)
        ).toStrictEqual([
            [participant2],
            [participant3, participant4, participant5],
            [participant1, participant6]
        ])
    })
})

describe('match', () => {
    it('should match single participant to single activity', () => {
        const participant = newParticipant({ id: '1', priorities: ['1'] })
        const activity = newActivity({ id: '1', limit: 1 })

        const { activities, participants } = match(
            {
                participants: [participant],
                shuffleBeforeMatch: false
            },
            { activities: [activity], shuffleBeforeMatch: false }
        )

        expect(participants[0].assigned).toBe(true)
        expect(activities[0].participants[0].id).toBe(participant.id)
        expect(activities[0].participants.length).toBe(1)
    })

    it('should not match any more participants to an activity once its limit is reached', () => {
        const participant1 = newParticipant({ priorities: ['1'], id: '1' })
        const participant2 = newParticipant({ priorities: ['1'], id: '2' })
        const activity = newActivity({ id: '1', limit: 1 })

        const { participants, activities } = match(
            {
                participants: [participant1, participant2],
                shuffleBeforeMatch: false
            },
            { activities: [activity], shuffleBeforeMatch: false }
        )

        expect(participants[0].assigned).toBe(true)
        expect(activities[0].participants[0].id).toBe(participant1.id)
        expect(activities[0].participants.map((p) => p.id)).toStrictEqual(['1'])
        expect(participant2.assigned).toBe(false)
    })

    it('should match multiple participants and activities', () => {
        const participant1 = newParticipant({
            id: '1',
            priorities: ['1', '2', '3']
        })
        const participant2 = newParticipant({
            id: '2',
            priorities: ['4', '3', '2']
        })
        const participant3 = newParticipant({
            id: '3',
            priorities: ['1', '3', '2']
        })
        const participant4 = newParticipant({
            id: '4',
            priorities: ['3', '2', '1']
        })
        const participant5 = newParticipant({
            id: '5',
            priorities: ['2', '1', '3']
        })
        const participant6 = newParticipant({
            id: '6',
            priorities: ['3', '4', '1']
        })
        const participant7 = newParticipant({
            id: '7',
            priorities: ['1', '3', '2']
        })
        const participant8 = newParticipant({
            id: '8',
            priorities: ['3', '4', '2']
        })
        const participant9 = newParticipant({
            id: '9',
            priorities: ['3', '1', '4']
        })
        const participant10 = newParticipant({
            id: '10',
            priorities: ['4', '1', '2']
        })
        const activity1 = newActivity({
            id: '1',
            title: 'activity 1',
            minimum: 1,
            limit: 3
        })
        const activity2 = newActivity({
            id: '2',
            title: 'activity 2',
            minimum: 2,
            limit: 3
        })
        const activity3 = newActivity({
            id: '3',
            title: 'activity 3',
            minimum: 2,
            limit: 4
        })
        const activity4 = newActivity({
            id: '4',
            title: 'activity 3',
            minimum: 1,
            limit: 4
        })

        const { participants, activities } = match(
            {
                participants: [
                    participant1,
                    participant2,
                    participant3,
                    participant4,
                    participant5,
                    participant6,
                    participant7,
                    participant8,
                    participant9,
                    participant10
                ],
                shuffleBeforeMatch: false
            },
            {
                activities: [activity1, activity2, activity3, activity4],
                shuffleBeforeMatch: false
            }
        )

        expect(
            activities
                .find((a) => a.id === activity1.id)
                .participants.map((p) => p.id)
        ).toStrictEqual(
            [participant1, participant7, participant10].map((p) => p.id)
        )
        expect(
            activities
                .find((a) => a.id === activity2.id)
                .participants.map((p) => p.id)
        ).toStrictEqual([participant5, participant3].map((p) => p.id))
        expect(
            activities
                .find((a) => a.id === activity3.id)
                .participants.map((p) => p.id)
        ).toStrictEqual(
            [participant4, participant6, participant8, participant9].map(
                (p) => p.id
            )
        )
        expect(
            activities
                .find((a) => a.id === activity4.id)
                .participants.map((p) => p.id)
        ).toStrictEqual([participant2].map((p) => p.id))
    })

    xit('should mark participants as unmatched if none of their priorities could be met', () => {})

    xit('should add participants to waiting list if activity is full', () => {})
})
