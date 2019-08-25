import * as _ from 'lodash'
import * as util from 'util'

import {Student, Course} from './model'

export function NotUniqueError(entityType, propertyName, entity = {}) {
    this.message = `${propertyName} not unique for entity ${entityType}`
    this.entityType = entityType
    this.propertyName = propertyName
    this.entity = entity
}

export function NotExistError(entityType, id, referrer = {}) {
    this.message = `${entityType} with id=${id} does not exist. Referred to by ${referrer}.`
    this.entityType = entityType
    this.id = id
    this.referrer = referrer
}

// Since babel (and Typescript) cannot handle subclassing Error
// courtesy of https://www.metachris.com/2017/01/custom-errors-in-typescript-2.1/
util.inherits(NotUniqueError, Error)
util.inherits(NotExistError, Error)

export function match({ students, courses }) {
    assertActivityIdsAreUnique(courses)
    assertParticipantsIdsAreUnique(students)
    assertChosenActivitiesDoExist(students, courses)
    assertChoicesPerParticipantAreUnique(students)

    let currentPriorityIndex = 0
    const totalNumOfPriorities = students[0].priorities.length // TODO really??

    while (currentPriorityIndex < totalNumOfPriorities) {

        students.forEach(student => {
            const priorityToMatch = student.priorities[currentPriorityIndex]
            const course = _.find(courses, course => course.id === priorityToMatch)
            const isNotCourseFull = course.students.length < course.limit

            if (!student.matched && isNotCourseFull) {
                course.students.push(student)
                student.matched = true
            } else {
                course.shadows.push({ 
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
    students.forEach(student => {
        if (idSet.has(student.id)) {
            throw new NotUniqueError('Participant', 'id', new Student())
        } else {
            idSet.add(student.id)
        }
    })
}

function assertActivityIdsAreUnique(courses) {
    const idSet = new Set()
    courses.forEach(course => {
        if (idSet.has(course.id)) {
            throw new NotUniqueError('Activity', 'id', new Course())
        } else {
            idSet.add(course.id)
        }
    })
}

function assertChoicesPerParticipantAreUnique(students) {
    students.forEach(student => {
        let originalLength = student.priorities.length
        let dedupedLength = _.uniq(student.priorities).length
        if (originalLength !== dedupedLength) {
            throw new NotUniqueError('Participant', 'priorities', student)
        }
    })
}

function assertChosenActivitiesDoExist(students, courses) {
    const courseIds = courses.map(course => course.id)
    students.forEach(student => {
        student.priorities.forEach(priority => {
            if (!_.find(courseIds, courseId => courseId === priority)) {
                throw new NotExistError('Activity', priority, student)
            }
        })
    })
}