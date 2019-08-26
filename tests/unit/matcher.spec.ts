import assert from 'assert'
import expect from 'expect.js'

import {Course, match, Student} from '@/core'

function hasExactParticipants(activity, ...students) {
    assert.strictEqual(activity.students.length, students.length)
    students.forEach((student, index) => {
        assert.strictEqual(student, activity.students[index])
    })
}

describe('matcher module', () => {
    describe('#match()', () => {
        it('should match single participant to single activity', () => {
            const student = new Student({priorities: [1], id: 1})
            const course = new Course({id: 1, name: 'activity 1', limit: 1})

            const {students, courses} = match({students: [student], courses: [course]})

            assert.strictEqual(students[0].matched, true)
            assert.strictEqual(courses[0].students[0], student)
            assert.strictEqual(courses[0].students.length, 1)
        })

        it('should not match any more participants to an activity once its limit is reached', () => {
            const student1 = new Student({priorities: [1], id: 1})
            const student2 = new Student({priorities: [1], id: 2})
            const course = new Course({id: 1, name: 'activity 1', limit: 1})

            const {students, courses} = match({students: [student1, student2], courses: [course]})

            assert.strictEqual(students[0].matched, true)
            assert.strictEqual(courses[0].students[0], student1)
            assert.strictEqual(courses[0].students.length, 1)
            assert.strictEqual(student2.matched, false)
        })

        it('should match multiple participants and activities', () => {
            const student1 = new Student({priorities: [1, 2, 3], id: 1})
            const student2 = new Student({priorities: [1, 3, 2], id: 2})
            const student3 = new Student({priorities: [1, 3, 2], id: 3})
            const student4 = new Student({priorities: [3, 2, 1], id: 4})
            const student5 = new Student({priorities: [3, 1, 2], id: 5})
            const course1 = new Course({id: 1, name: 'activity 1', limit: 2})
            const course2 = new Course({id: 2, name: 'activity 2', limit: 2})
            const course3 = new Course({id: 3, name: 'activity 3', limit: 1})

            match({
                students: [student1, student2, student3, student4, student5],
                courses: [course1, course2, course3]
            })

            hasExactParticipants(course1, student1, student2)
            hasExactParticipants(course2, student3, student5)
            hasExactParticipants(course3, student4)
        })

        it('should fail if participants ids are not unique', () => {
            const student1 = new Student({priorities: [], id: 1})
            const student2 = new Student({priorities: [], id: 1})

            expect(match)
                .withArgs({students: [student1, student2], courses: []})
                .to.throwException(/id not unique for entity Participant/)
        })

        it('should fail if course ids are not unique', () => {
            const course1 = new Course({id: 1})
            const course2 = new Course({id: 1})

            expect(match)
                .withArgs({students: [], courses: [course1, course2]})
                .to.throwException(/id not unique for entity Activity/)
        })

        it('should fail if chosen activity does not exist', () => {
            const student1 = new Student({priorities: [2], id: 1})
            const course1 = new Course({id: 1, name: 'activity 1', limit: 1})

            expect(match)
                .withArgs({students: [student1], courses: [course1]})
                .to.throwException(/Activity with id=2 does not exist. Referred to by undefined undefined./)
        })

        it('should fail if choices per participant are not unique', () => {
            const student1 = new Student({priorities: [1, 1], id: 1})
            const course1 = new Course({id: 1, name: 'activity 1', limit: 1})

            expect(match)
                .withArgs({students: [student1], courses: [course1]})
                .to.throwException(/priorities not unique for entity Participant/)
        })

        xit('should mark students as unmatched if none of their priorities could be met', () => {
            assert.strictEqual(true, true)
        })

        xit('should add students to waiting list if course is full', () => {
            assert.strictEqual(true, true)
        })
    })
})
