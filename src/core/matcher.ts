import * as _ from 'lodash'

import { Course, Student } from './model'

export class NotUniqueError extends Error {
    public entityType: any
    public propertyName: any
    public entity: {}

    constructor(entityType, propertyName, entity = {}) {
        super(`${propertyName} not unique for entity ${entityType}`)
        Object.setPrototypeOf(this, NotUniqueError.prototype)
        this.entityType = entityType
        this.propertyName = propertyName
        this.entity = entity
    }
}

export class NotExistError extends Error {
    public entityType: any
    public id: any
    public referrer: {}

    constructor(entityType, id, referrer = {}) {
        super(
            `${entityType} with id=${id} does not exist. Referred to by ${referrer}.`
        )
        Object.setPrototypeOf(this, NotExistError.prototype)
        this.entityType = entityType
        this.id = id
        this.referrer = referrer
    }
}

export function match({ students, courses }) {
    assertActivityIdsAreUnique(courses)
    assertParticipantsIdsAreUnique(students)
    assertChosenActivitiesDoExist(students, courses)
    assertChoicesPerParticipantAreUnique(students)

    let currentPriorityIndex = 0
    const totalNumOfPriorities = students[0].priorities.length // TODO really??

    while (currentPriorityIndex < totalNumOfPriorities) {
        students.forEach((student) => {
            const priorityToMatch = student.priorities[currentPriorityIndex]
            const currentCourse = _.find(
                courses,
                (course) => course.id === priorityToMatch
            )
            const isNotCourseFull =
                currentCourse.students.length < currentCourse.limit

            if (!student.matched && isNotCourseFull) {
                currentCourse.students.push(student)
                student.matched = true
            } else {
                currentCourse.shadows.push({
                    student,
                    wasCourseFull: !isNotCourseFull,
                    wasAlreadyMatched: student.matched,
                    priority: currentPriorityIndex + 1
                })
            }
        })

        currentPriorityIndex = currentPriorityIndex + 1
    }

    return { students, courses }
}

function assertParticipantsIdsAreUnique(students) {
    const idSet = new Set()
    students.forEach((student) => {
        if (idSet.has(student.id)) {
            throw new NotUniqueError('Participant', 'id', new Student({}))
        } else {
            idSet.add(student.id)
        }
    })
}

function assertActivityIdsAreUnique(courses) {
    const idSet = new Set()
    courses.forEach((course) => {
        if (idSet.has(course.id)) {
            throw new NotUniqueError('Activity', 'id', new Course({}))
        } else {
            idSet.add(course.id)
        }
    })
}

function assertChoicesPerParticipantAreUnique(students) {
    students.forEach((student) => {
        const originalLength = student.priorities.length
        const dedupedLength = _.uniq(student.priorities).length
        if (originalLength !== dedupedLength) {
            throw new NotUniqueError('Participant', 'priorities', student)
        }
    })
}

function assertChosenActivitiesDoExist(students, courses) {
    const courseIds = courses.map((course) => course.id)
    students.forEach((student) => {
        student.priorities.forEach((priority) => {
            if (!_.find(courseIds, (courseId) => courseId === priority)) {
                throw new NotExistError('Activity', priority, student)
            }
        })
    })
}
