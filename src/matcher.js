const {log} = require('./log')

function match({ students, courses }) {
    students.forEach(student => {
        for (let unmatchedPriority of student.unmatchedPriorities()) {
            tryToMatchFor(unmatchedPriority, student, courses)
        }
        if (student.matched !== true) {
            log.warn(student + ' konnte nicht zugewiesen werden')
        }
    })

    return {students, courses}
}

function tryToMatchFor(prio, student, courses) {
    courses.forEach(course => {
        if (course.id === prio &&
            course.students.length < course.limit &&
            !student.matched) {
            course.students.push(student)
            student.matched = true
            log.debug(student + ' kommt in Kurs "' + course + '"')
        } else if (course.id === prio) {
            course.waitingList.push(student)
        }
    })
}

exports.match = match