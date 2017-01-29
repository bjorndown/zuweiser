const {readExcel, getRowsAsObjects, getOverview} = require('./reader')
const {match} = require('./matcher')
const {writeMatch} = require('./writer')
const {convertStudent, convertCourse} = require('./model')

function readCourses({ workbook, config }) {
    let rawCourses = getRowsAsObjects(workbook, config.courses.worksheet)
    let courses = rawCourses.map(rawCourse => convertCourse(rawCourse, config.courses.fields))
    return { courses, workbook, config }
}

function readStudents({ workbook, courses, config }) {
    let rawStudents = getRowsAsObjects(workbook, config.student.worksheet)
    let students = rawStudents.map(rawStudent => convertStudent(rawStudent, config.student.fields))
    return { workbook, students, courses, config }
}

exports.readExcel = readExcel
exports.readCourses = readCourses
exports.readStudents = readStudents
exports.match = match
exports.writeMatch = writeMatch
exports.getOverview = getOverview
