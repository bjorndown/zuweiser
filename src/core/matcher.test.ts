import {
    getMinimalPriorityToFillToMinimum,
    getParticipantsInPriorityOrder,
    match,
    sortByDeltaToMinimum
} from './matcher'
import {
    AssignableActivity,
    AssignableParticipant,
    validateModel
} from './model'

describe('sortByDeltaToMinimum', () => {
    it('must return activitys ordered by how many participants are missing to reach its minimum', () => {
        const activitiesPerPerson = 1
        const activity1 = new AssignableActivity(
            { id: '1', title: '', minimum: 3, limit: 4 },
            { activitiesPerPerson }
        )
        activity1.assignParticipant(
            new AssignableParticipant(
                {
                    id: '1',
                    priorities: []
                },
                { activitiesPerPerson }
            ),
            1
        )
        const activity2 = new AssignableActivity(
            { id: '2', title: '', minimum: 2, limit: 4 },
            { activitiesPerPerson }
        )
        activity2.assignParticipant(
            new AssignableParticipant(
                {
                    id: '2',
                    priorities: []
                },
                { activitiesPerPerson }
            ),
            1
        )
        const activity3 = new AssignableActivity(
            { id: '3', title: '', minimum: 1, limit: 4 },
            { activitiesPerPerson }
        )
        activity3.assignParticipant(
            new AssignableParticipant(
                {
                    id: '2',
                    priorities: []
                },
                { activitiesPerPerson }
            ),
            1
        )
        const sorted = sortByDeltaToMinimum(
            [activity2, activity3, activity1],
            1
        )
        expect(sorted[0]).toStrictEqual(activity1)
        expect(sorted[1]).toStrictEqual(activity2)
        expect(sorted[2]).toStrictEqual(activity3)
    })
})

describe('getMinimalPriorityToFillToMinimum', () => {
    it('must return the priority and index of participant needed to fill activity to the minimum', () => {
        const activity = new AssignableActivity(
            { id: '1', title: '', minimum: 3, limit: 10 },
            { activitiesPerPerson: 1 }
        )
        const activity2 = new AssignableActivity(
            { id: '2', title: '', minimum: 10, limit: 10 },
            { activitiesPerPerson: 1 }
        )
        const activity3 = new AssignableActivity(
            { id: '3', title: '', minimum: 10, limit: 10 },
            { activitiesPerPerson: 1 }
        )
        const participant1 = new AssignableParticipant(
            {
                id: '1',
                priorities: ['1', '2', '3']
            },
            { activitiesPerPerson: 2 }
        )
        const participant2 = new AssignableParticipant(
            {
                id: '2',
                priorities: ['2', '1', '3']
            },
            { activitiesPerPerson: 2 }
        )
        const participant3 = new AssignableParticipant(
            {
                id: '3',
                priorities: ['3', '1', '2']
            },
            { activitiesPerPerson: 2 }
        )
        const participant4 = new AssignableParticipant(
            {
                id: '4',
                priorities: ['2', '3', '1']
            },
            { activitiesPerPerson: 2 }
        )
        const participant5 = new AssignableParticipant(
            {
                id: '5',
                priorities: ['3', '2', '1']
            },
            { activitiesPerPerson: 2 }
        )
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
        const activity = new AssignableActivity(
            { id: '1', title: '', minimum: 10, limit: 3 },
            { activitiesPerPerson: 1 }
        )
        const activity2 = new AssignableActivity(
            { id: '2', title: '', minimum: 10, limit: 10 },
            { activitiesPerPerson: 1 }
        )
        const activity3 = new AssignableActivity(
            { id: '3', title: '', minimum: 10, limit: 10 },
            { activitiesPerPerson: 1 }
        )
        const participant1 = new AssignableParticipant(
            {
                id: '1',
                priorities: ['1', '2', '3']
            },
            { activitiesPerPerson: 2 }
        )
        const participant2 = new AssignableParticipant(
            {
                id: '2',
                priorities: ['2', '1', '3']
            },
            { activitiesPerPerson: 2 }
        )
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
        const activity1 = new AssignableActivity(
            { id: '1', title: '', minimum: 10, limit: 10 },
            { activitiesPerPerson: 1 }
        )
        const activity2 = new AssignableActivity(
            { id: '2', title: '', minimum: 10, limit: 10 },
            { activitiesPerPerson: 1 }
        )
        const activity3 = new AssignableActivity(
            { id: '3', title: '', minimum: 10, limit: 10 },
            { activitiesPerPerson: 1 }
        )
        const participant1 = new AssignableParticipant(
            {
                id: '1',
                priorities: ['1', '2', '3']
            },
            { activitiesPerPerson: 2 }
        )
        const participant2 = new AssignableParticipant(
            {
                id: '2',
                priorities: ['3', '2', '1']
            },
            { activitiesPerPerson: 2 }
        )
        const participant3 = new AssignableParticipant(
            {
                id: '3',
                priorities: ['2', '3', '1']
            },
            { activitiesPerPerson: 2 }
        )
        const participant4 = new AssignableParticipant(
            {
                id: '4',
                priorities: ['1', '3', '2']
            },
            { activitiesPerPerson: 2 }
        )
        const participant5 = new AssignableParticipant(
            {
                id: '5',
                priorities: ['2', '3', '1']
            },
            { activitiesPerPerson: 2 }
        )
        const participant6 = new AssignableParticipant(
            {
                id: '6',
                priorities: ['2', '1', '3']
            },
            { activitiesPerPerson: 2 }
        )
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
        const participant = new AssignableParticipant(
            {
                id: '1',
                priorities: ['1']
            },
            { activitiesPerPerson: 2 }
        )
        const activity = new AssignableActivity(
            { id: '1', title: '', minimum: 10, limit: 1 },
            { activitiesPerPerson: 1 }
        )

        const { activities, participants } = match(
            {
                participants: [participant],
                shuffleBeforeMatch: false,
                activitiesPerPerson: 2,
                prioritiesPerPerson: participant.priorities.length,
                otherAttributesColumns: []
            },
            { activities: [activity], shuffleBeforeMatch: false }
        )

        expect(participants[0].isAssignedTo(activity, 1)).toBe(true)
        expect(activities[0].participants[1][0].id).toBe(participant.id)
        expect(activities[0].participants[1].length).toBe(1)
    })

    it('should not match any more participants to an activity once its limit is reached', () => {
        const activitiesPerPerson = 1
        const participant1 = new AssignableParticipant(
            {
                id: '1',
                priorities: ['1']
            },
            { activitiesPerPerson }
        )
        const participant2 = new AssignableParticipant(
            {
                id: '2',
                priorities: ['1']
            },
            { activitiesPerPerson }
        )
        const activity = new AssignableActivity(
            { id: '1', title: '', minimum: 10, limit: 1 },
            { activitiesPerPerson }
        )

        const { participants, activities } = match(
            {
                participants: [participant1, participant2],
                shuffleBeforeMatch: false,
                activitiesPerPerson,
                prioritiesPerPerson: participant1.priorities.length,
                otherAttributesColumns: []
            },
            { activities: [activity], shuffleBeforeMatch: false }
        )

        expect(participants[0].needsMoreActivities()).toBe(false)
        expect(activities[0].participants[1][0].id).toBe(participant1.id)
        expect(activities[0].participants[1].map((p) => p.id)).toStrictEqual([
            '1'
        ])
        expect(participant2.needsMoreActivities()).toBe(true)
    })

    it('should match multiple participants and activities', () => {
        const activitiesPerPerson = 1
        const participant1 = new AssignableParticipant(
            {
                id: '1',
                priorities: ['1', '2', '3']
            },
            { activitiesPerPerson }
        )
        const participant2 = new AssignableParticipant(
            {
                id: '2',
                priorities: ['4', '3', '2']
            },
            { activitiesPerPerson }
        )
        const participant3 = new AssignableParticipant(
            {
                id: '3',
                priorities: ['1', '3', '2']
            },
            { activitiesPerPerson }
        )
        const participant4 = new AssignableParticipant(
            {
                id: '4',
                priorities: ['3', '2', '1']
            },
            { activitiesPerPerson }
        )
        const participant5 = new AssignableParticipant(
            {
                id: '5',
                priorities: ['2', '1', '3']
            },
            { activitiesPerPerson }
        )
        const participant6 = new AssignableParticipant(
            {
                id: '6',
                priorities: ['3', '4', '1']
            },
            { activitiesPerPerson }
        )
        const participant7 = new AssignableParticipant(
            {
                id: '7',
                priorities: ['1', '3', '2']
            },
            { activitiesPerPerson }
        )
        const participant8 = new AssignableParticipant(
            {
                id: '8',
                priorities: ['3', '4', '2']
            },
            { activitiesPerPerson }
        )
        const participant9 = new AssignableParticipant(
            {
                id: '9',
                priorities: ['3', '1', '4']
            },
            { activitiesPerPerson }
        )
        const participant10 = new AssignableParticipant(
            {
                id: '10',
                priorities: ['4', '1', '2']
            },
            { activitiesPerPerson }
        )
        const activity1 = new AssignableActivity(
            { id: '1', title: '', minimum: 1, limit: 3 },
            { activitiesPerPerson }
        )
        const activity2 = new AssignableActivity(
            { id: '2', title: '', minimum: 2, limit: 3 },
            { activitiesPerPerson }
        )
        const activity3 = new AssignableActivity(
            { id: '3', title: '', minimum: 2, limit: 4 },
            { activitiesPerPerson }
        )
        const activity4 = new AssignableActivity(
            { id: '4', title: '', minimum: 1, limit: 4 },
            { activitiesPerPerson }
        )

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
                shuffleBeforeMatch: false,
                activitiesPerPerson,
                prioritiesPerPerson: participant1.priorities.length,
                otherAttributesColumns: []
            },
            {
                activities: [activity1, activity2, activity3, activity4],
                shuffleBeforeMatch: false
            }
        )

        expect(
            activities
                .find((a) => a.id === activity1.id)
                .participants[1].map((p) => p.id)
        ).toStrictEqual(
            [participant1, participant7, participant10].map((p) => p.id)
        )
        expect(
            activities
                .find((a) => a.id === activity2.id)
                .participants[1].map((p) => p.id)
        ).toStrictEqual([participant5, participant3].map((p) => p.id))
        expect(
            activities
                .find((a) => a.id === activity3.id)
                .participants[1].map((p) => p.id)
        ).toStrictEqual(
            [participant4, participant6, participant8, participant9].map(
                (p) => p.id
            )
        )
        expect(
            activities
                .find((a) => a.id === activity4.id)
                .participants[1].map((p) => p.id)
        ).toStrictEqual([participant2].map((p) => p.id))
    })

    xit('should mark participants as unmatched if none of their priorities could be met', () => {})

    xit('should add participants to waiting list if activity is full', () => {})
})
