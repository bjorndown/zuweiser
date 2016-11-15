const _ = require('lodash');

function match({ students, courses }) {
    students.forEach(student => {
        tryToMatchFor(student.prio1, student, courses);

        if (student.matched !== true) {
            tryToMatchFor(student.prio2, student, courses);
        } 
        if (student.matched !== true) {
            tryToMatchFor(student.prio3, student, courses);
        }

        if (student.matched !== true) {
            console.log(student + ' konnte nicht zugewiesen werden');
        }
    });

    return {students, courses};
}

function tryToMatchFor(prio, student, courses) {
    courses.forEach(course => {
            if (course.id === prio && 
                course.students.length < course.limit) {
                course.students.push(student);
                student.matched = true;
                console.log(student + ' kommt in Kurs "' + course + '"');
            } else if (course.id === prio) {
                course.waitingList.push(student);
                student.matched = false;
            }
    });
}

exports.match = match;