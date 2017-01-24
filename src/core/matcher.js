const _ = require('lodash')

const {log} = require('./log')

function match({ students, courses }) {
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
            if (course.students.length < course.limit && !student.matched) {
                course.students.push(student)
                student.matched = true
                log.debug(student + ' kommt in Kurs "' + course + '"')
            } else {
                course.waitingList.push(student)
            }
        })

        currentPriorityIndex = currentPriorityIndex + 1
    }

    return {students, courses}
}

function assertParticipantsIdsAreUnique(students) {
    const idSet = new Set()
    students.forEach(student => {
        if (idSet.has(student.id)) {
            throw new Error(`Participants\' ids not unique: ${student.id}`)
        } else {
            idSet.add(student.id)
        }
    })
}

function assertActivityIdsAreUnique(courses) {
    const idSet = new Set()
    courses.forEach(course => {
        if (idSet.has(course.id)) {
            throw new Error(`Activities\' ids not unique: ${course.id}`)
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
            throw new Error(`Choices not unique: ${student}`)
        }
    })
}

function assertChosenActivitiesDoExist(students, courses) {
    const courseIds = courses.map(course => course.id)
    students.forEach(student => {
        student.priorities.forEach(priority => {
            if (!_.find(courseIds, courseId => courseId === priority)) {
                throw new Error(`Activity does not exist: ${priority}`)
            }
        })
    })
}

exports.match = match