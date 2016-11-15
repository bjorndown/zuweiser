const _ = require('lodash');

const {readExcel, getRowsAsObjects} = require('./reader');
const {match} = require('./matcher');
const {writeMatch} = require('./writer');

const config = {
    filename: './projektwoche.xlsx',
    student: { 
        worksheet: 'Schüler',
        fields: {
            id: 'id',
            name: 'name',
            firstName: 'vorname',
            prio1: 'Prio 1',
            prio2: 'Prio 2',
            prio3: 'Prio 3'
        }
    },
    courses: { 
        worksheet: 'Kurse',
        fields: {
            limit: 'max-teilnehmer',
            id: 'id',
            name: 'name'
        }
    }
};

function readCourses(workbook) {
    let courses = getRowsAsObjects(workbook, config.courses.worksheet);
    return { courses, workbook };
}

function readStudents({ workbook, courses }) {
    let students = getRowsAsObjects(workbook, config.student.worksheet);
    return { workbook, students, courses };
}

readExcel(config.filename)
    .then(readCourses)
    .then(readStudents)
    .then(match)
    .then(writeMatch);

