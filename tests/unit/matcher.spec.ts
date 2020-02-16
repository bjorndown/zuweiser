import assert from 'assert'
import expect from 'expect.js'

import { Course, Student } from '@/core/model'
import {
    match,
    getMinimalPriorityToFillToMinimum,
    getStudentsInPriorityOrder,
    sanityCeck,
    WorksheetConfig,
    sortByDeltaToMinimum
} from '@/core/matcher'

const config: WorksheetConfig = {
    student: { shuffleBeforeMatch: false, fields: { priorities: [] } },
    courses: { shuffleBeforeMatch: false }
}

const setNumberOfPriorites = (numberOfPriorities) => {
    config.student.fields.priorities = new Array(numberOfPriorities)
}

const newStudent = (id, priorities: number[] = []) =>
    new Student({ id, priorities })

const newCourse = (id, minimum = 10, limit = 10, students: Student[] = []) => {
    const course = new Course({ id, minimum, limit })
    course.students = students
    return course
}

describe('matcher module', () => {
    describe('sortByDeltaToMinimum', () => {
        it('must return courses ordered by how many students are missing to reach its minimum', () => {
            const course1 = newCourse(1, 3, 0, [newStudent(1)])
            const course2 = newCourse(2, 2, 0, [newStudent(2)])
            const course3 = newCourse(3, 1, 0, [newStudent(2)])
            const sorted = sortByDeltaToMinimum([course2, course3, course1])
            assert.strictEqual(sorted[0], course1)
            assert.strictEqual(sorted[1], course2)
            assert.strictEqual(sorted[2], course3)
        })
    })

    describe('getMinimalPriority', () => {
        it('must return the priority and index of student needed to fill course to the minimum', () => {
            const course = newCourse(1, 3)
            const course2 = newCourse(2)
            const course3 = newCourse(3)
            const student1 = newStudent(1, [1, 2, 3])
            const student2 = newStudent(2, [2, 1, 3])
            const student3 = newStudent(3, [3, 1, 2])
            const student4 = newStudent(4, [2, 3, 1])
            const student5 = newStudent(5, [3, 2, 1])
            const studentsInOrder = [
                [student1],
                [student2, student3],
                [student4, student5]
            ]
            sanityCeck({
                students: studentsInOrder.flat(),
                courses: [course, course2, course3],
                config
            })
            assert.deepEqual(
                getMinimalPriorityToFillToMinimum(course, studentsInOrder, 3),
                { priority: 1, index: 1 }
            )
        })

        it('must return NaN and NaN if course cannot be filled to minimum with the given priorities', () => {
            const course = newCourse(1, 3)
            const course2 = newCourse(2)
            const course3 = newCourse(3)
            const student1 = newStudent(1, [1, 2, 3])
            const student2 = newStudent(2, [2, 1, 3])
            const studentsInOrder = [[student1], [student2], []]
            sanityCeck({
                students: studentsInOrder.flat(),
                courses: [course, course2, course3],
                config
            })
            assert.deepEqual(
                getMinimalPriorityToFillToMinimum(course, studentsInOrder, 3),
                { priority: -1, index: -1 }
            )
        })
    })

    describe('getStudentsInOrder', () => {
        it('must work', () => {
            const course1 = newCourse(1)
            const course2 = newCourse(2)
            const course3 = newCourse(3)
            const student1 = newStudent(1, [1, 2, 3])
            const student2 = newStudent(2, [3, 2, 1])
            const student3 = newStudent(3, [2, 3, 1])
            const student4 = newStudent(4, [1, 3, 2])
            const student5 = newStudent(5, [2, 3, 1])
            const student6 = newStudent(6, [2, 1, 3])
            const students = [
                student1,
                student2,
                student3,
                student4,
                student5,
                student6
            ]
            sanityCeck({
                students,
                courses: [course1, course2, course3],
                config
            })
            assert.deepEqual(getStudentsInPriorityOrder(students, course1, 3), [
                [student1, student4],
                [student6],
                [student2, student3, student5]
            ])
            assert.deepEqual(getStudentsInPriorityOrder(students, course2, 3), [
                [student3, student5, student6],
                [student1, student2],
                [student4]
            ])
            assert.deepEqual(getStudentsInPriorityOrder(students, course3, 3), [
                [student2],
                [student3, student4, student5],
                [student1, student6]
            ])
        })
    })

    describe('match()', () => {
        it('should match single participant to single activity', () => {
            const student = new Student({ priorities: [1], id: 1 })
            const course = new Course({ id: 1, name: 'activity 1', limit: 1 })
            setNumberOfPriorites(1)

            const { students, courses } = match({
                students: [student],
                courses: [course],
                config
            })

            assert.strictEqual(students[0].matched, true)
            assert.strictEqual(courses[0].students[0], student)
            assert.strictEqual(courses[0].students.length, 1)
        })

        it('should not match any more participants to an activity once its limit is reached', () => {
            const student1 = new Student({ priorities: [1], id: 1 })
            const student2 = new Student({ priorities: [1], id: 2 })
            const course = new Course({ id: 1, name: 'activity 1', limit: 1 })
            setNumberOfPriorites(1)

            const { students, courses } = match({
                students: [student1, student2],
                courses: [course],
                config
            })

            assert.strictEqual(students[0].matched, true)
            assert.strictEqual(courses[0].students[0], student1)
            assert.strictEqual(courses[0].students.length, 1)
            assert.strictEqual(student2.matched, false)
        })

        it('should match multiple participants and activities', () => {
            const student1 = new Student({ priorities: [1, 2, 3], id: 1 })
            const student2 = new Student({ priorities: [4, 3, 2], id: 2 })
            const student3 = new Student({ priorities: [1, 3, 2], id: 3 })
            const student4 = new Student({ priorities: [3, 2, 1], id: 4 })
            const student5 = new Student({ priorities: [2, 1, 3], id: 5 })
            const student6 = new Student({ priorities: [3, 4, 1], id: 6 })
            const student7 = new Student({ priorities: [1, 3, 2], id: 7 })
            const student8 = new Student({ priorities: [3, 4, 2], id: 8 })
            const student9 = new Student({ priorities: [3, 1, 4], id: 9 })
            const student10 = new Student({ priorities: [4, 1, 2], id: 10 })
            const course1 = new Course({
                id: 1,
                name: 'activity 1',
                minimum: 1,
                limit: 3
            })
            const course2 = new Course({
                id: 2,
                name: 'activity 2',
                minimum: 2,
                limit: 3
            })
            const course3 = new Course({
                id: 3,
                name: 'activity 3',
                minimum: 2,
                limit: 4
            })
            const course4 = new Course({
                id: 4,
                name: 'activity 3',
                minimum: 1,
                limit: 4
            })
            setNumberOfPriorites(3)

            match({
                students: [
                    student1,
                    student2,
                    student3,
                    student4,
                    student5,
                    student6,
                    student7,
                    student8,
                    student9,
                    student10
                ],
                courses: [course1, course2, course3, course4],
                config
            })

            assert.deepEqual(course1.students, [student1, student7, student10])
            assert.deepEqual(course2.students, [student5, student3])
            assert.deepEqual(course3.students, [
                student4,
                student6,
                student8,
                student9
            ])
            assert.deepEqual(course4.students, [student2])
        })

        it('should fail if participants ids are not unique', () => {
            const student1 = new Student({ priorities: [], id: 1 })
            const student2 = new Student({ priorities: [], id: 1 })

            expect(match)
                .withArgs({ students: [student1, student2], courses: [] })
                .to.throwException(/id not unique for entity Participant/)
        })

        it('should fail if course ids are not unique', () => {
            const course1 = new Course({ id: 1 })
            const course2 = new Course({ id: 1 })

            expect(match)
                .withArgs({ students: [], courses: [course1, course2] })
                .to.throwException(/id not unique for entity Activity/)
        })

        it('should fail if chosen activity does not exist', () => {
            const student1 = new Student({ priorities: [2], id: 1 })
            const course1 = new Course({ id: 1, name: 'activity 1', limit: 1 })
            setNumberOfPriorites(1)

            expect(match)
                .withArgs({ students: [student1], courses: [course1] })
                .to.throwException(
                    /Activity with id=2 does not exist. Referred to by undefined undefined./
                )
        })

        it('should fail if choices per participant are not unique', () => {
            const student1 = new Student({ priorities: [1, 1], id: 1 })
            const course1 = new Course({ id: 1, name: 'activity 1', limit: 1 })

            expect(match)
                .withArgs({ students: [student1], courses: [course1] })
                .to.throwException(
                    /priorities not unique for entity Participant/
                )
        })

        xit('should mark students as unmatched if none of their priorities could be met', () => {
            assert.strictEqual(true, true)
        })

        xit('should add students to waiting list if course is full', () => {
            assert.strictEqual(true, true)
        })
    })
})
