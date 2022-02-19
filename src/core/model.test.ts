import { createAssignableActivity, createAssignableParticipant } from './model'
import {match} from './matcher'

describe('AssignableActivity', () => {
    describe('assignParticipant', () => {
        it('must throw error if limit is reached and it is tried to assign one more participant', () => {
            const activity = createAssignableActivity({
                id: '1',
                limit: 1,
                minimum: 1,
                title: 'activity'
            })
            const participant1 = createAssignableParticipant({
                id: '1',
                priorities: []
            })
            const participant2 = createAssignableParticipant({
                id: '2',
                priorities: []
            })

            activity.assignParticipant(participant1)

            expect(() => activity.assignParticipant(participant2)).toThrowError(
                /full/
            )
        })
    })
    describe('isNotFull', () => {
        it('must return false if limit is reached', () => {
            const activity = createAssignableActivity({
                id: '1',
                limit: 1,
                minimum: 1,
                title: 'activity'
            })
            const participant1 = createAssignableParticipant({
                id: '1',
                priorities: []
            })

            activity.assignParticipant(participant1)

            expect(activity.isNotFull()).toBe(false)
        })
        it('must return true if below limit', () => {
            const activity = createAssignableActivity({
                id: '1',
                limit: 2,
                minimum: 1,
                title: 'activity'
            })
            const participant1 = createAssignableParticipant({
                id: '1',
                priorities: []
            })

            activity.assignParticipant(participant1)

            expect(activity.isNotFull()).toBe(true)
        })
    })
})


describe('AssignableParticipant', () => {
    describe('assigned setter', () => {
        it('must throw error if already assigned and is about to be assigned again', () => {
            const participant1 = createAssignableParticipant({
                id: '1',
                priorities: []
            })

            participant1.assigned = true

            expect(() => participant1.assigned = true).toThrowError(/already assigned/)
        })
        it('must allow to unassign', () => {
            const participant1 = createAssignableParticipant({
                id: '1',
                priorities: []
            })

            participant1.assigned = true
            participant1.assigned = false

            expect(participant1.assigned).toBe(false)
        })
    })
})

describe('validateModel', () => {
    it('should fail if participants ids are not unique', () => {
        const participant1 = createAssignableParticipant({ priorities: [], id: '1' })
        const participant2 = createAssignableParticipant({ priorities: [], id: '1' })
        const participant3 = createAssignableParticipant({ priorities: [], id: '3' })

        expect(() =>
            match(
                {
                    participants: [participant1, participant2, participant3],
                    shuffleBeforeMatch: false
                },
                { activities: [], shuffleBeforeMatch: false }
            )
        ).toThrowError(/id=1 not unique for Participant with id=1/)
    })

    it('should fail if activity ids are not unique', () => {
        const activity1 = createAssignableActivity({ id: '1', title: '', minimum: 0, limit: 0})
        const activity2 = createAssignableActivity({  id: '1', title: '', minimum: 0, limit: 0 })
        const activity3 = createAssignableActivity({  id: '2', title: '', minimum: 0, limit: 0 })

        expect(() =>
            match(
                {
                    participants: [],
                    shuffleBeforeMatch: false
                },
                {
                    activities: [activity1, activity2, activity3],
                    shuffleBeforeMatch: false
                }
            )
        ).toThrowError(/id=1 not unique for Activity with id=1/)
    })

    it('should fail if chosen activity does not exist', () => {
        const participant1 = createAssignableParticipant({ priorities: ['2'], id: '1' })
        const activity1 = createAssignableActivity({
            id: '1',
            title: 'activity 1',
            limit: 1,
            minimum: 0
        })
        const activity3 = createAssignableActivity({
            id: '3',
            title: 'activity 3',
            limit: 1,
            minimum: 0
        })

        expect(() =>
            match(
                {
                    participants: [participant1],
                    shuffleBeforeMatch: false
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
        const participant1 = createAssignableParticipant({ priorities: ['1', '1'], id: '1' })
        const participant2 = createAssignableParticipant({ priorities: ['1', '2'], id: '2' })
        const activity1 = createAssignableActivity({
            id: '1',
            title: 'activity 1',
            limit: 1,
            minimum: 0
        })
        const activity2 = createAssignableActivity({
            id: '2',
            title: 'activity 2',
            limit: 1,
            minimum: 0
        })

        expect(() =>
            match(
                {
                    participants: [participant1, participant2],
                    shuffleBeforeMatch: false
                },
                {
                    activities: [activity1, activity2],
                    shuffleBeforeMatch: false
                }
            )
        ).toThrowError(/priorities=1,1 not unique for Participant with id=1/)
    })
})