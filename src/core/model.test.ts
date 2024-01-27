import {
    AssignableActivity,
    AssignableParticipant,
    ParticipantsConfig
} from './model'
import { match } from './matcher'

const config: Pick<ParticipantsConfig, 'activitiesPerPerson'> = {
    activitiesPerPerson: 2
}

describe('AssignableActivity', () => {
    describe('assignParticipant', () => {
        it('must throw error if limit is reached and it is tried to assign one more participant', () => {
            const activity = new AssignableActivity(
                {
                    id: '1',
                    limit: 1,
                    minimum: 1,
                    title: 'activity'
                },
                { activitiesPerPerson: 1 }
            )
            const participant1 = new AssignableParticipant(
                {
                    id: '1',
                    priorities: []
                },
                config
            )
            const participant2 = new AssignableParticipant(
                {
                    id: '2',
                    priorities: []
                },
                config
            )

            activity.assignParticipant(participant1, 1)

            expect(() =>
                activity.assignParticipant(participant2, 1)
            ).toThrowError(/full/)
        })
    })
    describe('isNotFull', () => {
        it('must return false if limit is reached', () => {
            const activity = new AssignableActivity(
                {
                    id: '1',
                    limit: 1,
                    minimum: 1,
                    title: 'activity'
                },
                { activitiesPerPerson: 1 }
            )
            const participant1 = new AssignableParticipant(
                {
                    id: '1',
                    priorities: []
                },
                config
            )

            activity.assignParticipant(participant1, 1)

            expect(activity.isNotFull(1)).toBe(false)
        })
        it('must return true if below limit', () => {
            const activity = new AssignableActivity(
                {
                    id: '1',
                    limit: 2,
                    minimum: 1,
                    title: 'activity'
                },
                { activitiesPerPerson: 1 }
            )
            const participant1 = new AssignableParticipant(
                {
                    id: '1',
                    priorities: []
                },
                config
            )

            activity.assignParticipant(participant1, 1)

            expect(activity.isNotFull(1)).toBe(true)
        })
    })
})

describe('AssignableParticipant', () => {
    describe('assign', () => {
        it('must throw error if already assigned and is tried to be assigned to the same activity again', () => {
            const participant1 = new AssignableParticipant(
                {
                    id: '1',
                    priorities: []
                },
                config
            )

            let activity = new AssignableActivity(
                {
                    id: '1',
                    limit: 2,
                    minimum: 2,
                    title: 'a'
                },
                { activitiesPerPerson: 1 }
            )

            participant1.assign(activity, 0)

            expect(() => participant1.assign(activity, 0)).toThrowError(
                /already assigned/
            )
        })
    })
})

describe('validateModel', () => {
    it('should fail if participants ids are not unique', () => {
        const participant1 = new AssignableParticipant(
            {
                priorities: [],
                id: '1'
            },
            config
        )
        const participant2 = new AssignableParticipant(
            {
                priorities: [],
                id: '1'
            },
            config
        )
        const participant3 = new AssignableParticipant(
            {
                priorities: [],
                id: '3'
            },
            config
        )

        expect(() =>
            match(
                {
                    participants: [participant1, participant2, participant3],
                    shuffleBeforeMatch: false,
                    activitiesPerPerson: 2,
                    prioritiesPerPerson: participant1.priorities.length,
                    otherAttributesColumns: []
                },
                { activities: [], shuffleBeforeMatch: false }
            )
        ).toThrowError(/id=1 not unique for Participant with id=1/)
    })

    it('should fail if activity ids are not unique', () => {
        const activity1 = new AssignableActivity(
            {
                id: '1',
                title: '',
                minimum: 0,
                limit: 0
            },
            { activitiesPerPerson: 1 }
        )
        const activity2 = new AssignableActivity(
            {
                id: '1',
                title: '',
                minimum: 0,
                limit: 0
            },
            { activitiesPerPerson: 1 }
        )
        const activity3 = new AssignableActivity(
            {
                id: '2',
                title: '',
                minimum: 0,
                limit: 0
            },
            { activitiesPerPerson: 1 }
        )

        expect(() =>
            match(
                {
                    participants: [],
                    shuffleBeforeMatch: false,
                    activitiesPerPerson: 2,
                    prioritiesPerPerson: 2,
                    otherAttributesColumns: []
                },
                {
                    activities: [activity1, activity2, activity3],
                    shuffleBeforeMatch: false
                }
            )
        ).toThrowError(/id=1 not unique for Activity with id=1/)
    })

    it('should fail if chosen activity does not exist', () => {
        const participant1 = new AssignableParticipant(
            {
                priorities: ['2'],
                id: '1'
            },
            config
        )
        const activity1 = new AssignableActivity(
            {
                id: '1',
                title: 'activity 1',
                limit: 1,
                minimum: 0
            },
            { activitiesPerPerson: 1 }
        )
        const activity3 = new AssignableActivity(
            {
                id: '3',
                title: 'activity 3',
                limit: 1,
                minimum: 0
            },
            { activitiesPerPerson: 1 }
        )

        expect(() =>
            match(
                {
                    participants: [participant1],
                    shuffleBeforeMatch: false,
                    activitiesPerPerson: 2,
                    prioritiesPerPerson: participant1.priorities.length,
                    otherAttributesColumns: []
                },
                {
                    activities: [activity1, activity3],
                    shuffleBeforeMatch: false
                }
            )
        ).toThrowError(
            /Activity with id=2 does not exist. Referred to by Participant with id=1/
        )
    })

    it('should fail if choices per participant are not unique', () => {
        const participant1 = new AssignableParticipant(
            {
                priorities: ['1', '1'],
                id: '1'
            },
            config
        )
        const participant2 = new AssignableParticipant(
            {
                priorities: ['1', '2'],
                id: '2'
            },
            config
        )
        const activity1 = new AssignableActivity(
            {
                id: '1',
                title: 'activity 1',
                limit: 1,
                minimum: 0
            },
            { activitiesPerPerson: 2 }
        )
        const activity2 = new AssignableActivity(
            {
                id: '2',
                title: 'activity 2',
                limit: 1,
                minimum: 0
            },
            { activitiesPerPerson: 2 }
        )

        expect(() =>
            match(
                {
                    participants: [participant1, participant2],
                    shuffleBeforeMatch: false,
                    activitiesPerPerson: 2,
                    prioritiesPerPerson: participant1.priorities.length,
                    otherAttributesColumns: []
                },
                {
                    activities: [activity1, activity2],
                    shuffleBeforeMatch: false
                }
            )
        ).toThrowError(/priorities=1,1 not unique for Participant with id=1/)
    })
})
