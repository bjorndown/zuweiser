const _ = require('lodash')
const {log} = require('./log')

function mapRawToObjFields(rawObj, fields) {
    let obj = {}
    // TODO clean up
    _.forOwn(fields, (value, key) => {
        if (_.isString(value)) {
            obj[key] = rawObj[value]
        } else if (_.isArray(value)) {
            obj[key] = []
            _.forOwn(value, (value2, key2) => {
                obj[key].push(rawObj[value2.column])
            })
        }
    })
    return obj
}

function convertStudent(rawStudent, studentFields) {
    let studentData = mapRawToObjFields(rawStudent, studentFields)
    return new Student(studentData)
}

function convertCourse(rawCourse, courseFields) {
    let courseData = mapRawToObjFields(rawCourse, courseFields)
    return new Course(courseData)
}

class Course {
    constructor(courseData) {
        this.courseData = courseData
        this.students = []
        this.waitingList = []
    }

    get id() {
        return this.courseData.id
    }

    get limit() {
        return this.courseData.limit
    }

    get name() {
        return this.courseData.name
    }

    toString() {
        return this.name
    }
}

class Student {

    constructor(studentData) {
        this.studentData = studentData
        this.matched = false
    }

    get id() {
        return this.studentData.id
    }

    get priorities() {
        return this.studentData.priorities
    }

    toString() {
        return this.studentData.firstName + ' ' + this.studentData.name
    }
}

exports.convertStudent = convertStudent
exports.convertCourse = convertCourse
exports.Student = Student
exports.Course = Course
