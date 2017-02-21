import * as _ from 'lodash'

export class Course {
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

export class Student {

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

    get name() {
        return this.studentData.name
    }

    get firstName() {
        return this.studentData.firstName
    }

    get class() {
        return this.studentData.class
    }

    toString() {
        return this.firstName + ' ' + this.name
    }
}

export function mapRawToObjFields(rawObj, fields) {
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

export function convertStudent(rawStudent, studentFields) {
    let studentData = mapRawToObjFields(rawStudent, studentFields)
    return new Student(studentData)
}

export function convertCourse(rawCourse, courseFields) {
    let courseData = mapRawToObjFields(rawCourse, courseFields)
    return new Course(courseData)
}