const _ = require('lodash');

function match({ students, courses }) {
    students.forEach(student => {
        let prio1 = student.prio1.result; // TODO Fix, only because cell has formula
        let prio2 = student.prio2.result; // TODO Fix, only because cell has formula
        let prio3 = student.prio3.result; // TODO Fix, only because cell has formula

        tryToMatchFor(prio1, student, courses);

        if (student.matched !== true) {
            tryToMatchFor(prio2, student, courses);
        } 
        if (student.matched !== true) {
            tryToMatchFor(prio3, student, courses);
        }

        if (student.matched !== true) {
            console.log(student + ' konnte nicht zugewiesen werden');
        }
    });

    return {students, courses};
}

function tryToMatchFor(prio, student, courses) {
    courses.forEach(course => {
            if (!_.isArray(course.students)) {
                course.students = [];
            } 
            if (!_.isArray(course.waitingList)) {
                course.waitingList = [];
            } 

            if (course.id === prio &&  // TODO config should not be needed here
                course.students.length < course['max-teilnehmer']) {
                course.students.push(student);
                student.matched = true;
                console.log(student.vorname + ' ' + student.name + ' kommt in Kurs "' + course.name + '"');
            } else if (course.id === prio) {
                course.waitingList.push(student);
                student.matched = false;
            }
    });
}

exports.match = match;