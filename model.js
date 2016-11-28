const _ = require('lodash')

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
        return this.name;
    }
}

class Student {

    constructor(studentData) {
        this.studentData = studentData;
        this.matched = false;
    }

    *unmatchedPriorities() {
        let index = 0;
        while (this.matched === false && index < this.studentData.priorities.length) {
            console.log('Matching priority ' + index + ' for ' + this)
            yield this.studentData.priorities[index]
            index = index + 1
        }
    }

    toString() {
        return this.studentData.firstName + ' ' + this.studentData.name
    }
}

exports.convertStudent = convertStudent;
exports.convertCourse = convertCourse;
