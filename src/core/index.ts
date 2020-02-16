import shuffle from 'lodash/shuffle'

import { getRowsAsObjects } from './reader'
import { convertCourse, convertStudent } from './model'

export { Student, Course } from './model'
export { match, NotExistError, NotUniqueError } from './matcher'
export { readExcel, getOverview } from './reader'

export function readCourses({ workbook, config }) {
    const rawCourses = getRowsAsObjects(workbook, config.courses.worksheet)
    const courses = rawCourses.map((rawCourse) =>
        convertCourse(rawCourse, config.courses.fields)
    )
    return { courses, workbook, config }
}

export function readStudents({ workbook, courses, config }) {
    const rawStudents = getRowsAsObjects(workbook, config.student.worksheet)
    const students = rawStudents.map((rawStudent) =>
        convertStudent(rawStudent, config.student.fields)
    )
    return { workbook, students, courses, config }
}
