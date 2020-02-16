import forOwn from 'lodash/forOwn'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'

export class Course {
    public students: Student[]
    private courseData: any // TODO

    constructor(courseData) {
        this.courseData = courseData
        this.students = []
    }

    public get id() {
        return this.courseData.id
    }

    public get limit() {
        return this.courseData.limit
    }

    public get minimum() {
        return this.courseData.minimum ?? 0
    }

    public get name() {
        return this.courseData.name
    }

    public toString() {
        return this.name
    }
}

export class Student {
    public matched: boolean
    private studentData: any

    constructor(studentData) {
        this.studentData = studentData
        this.matched = false
    }

    public get id() {
        return this.studentData.id
    }

    public get priorities() {
        return this.studentData.priorities
    }

    public get name() {
        return this.studentData.name
    }

    public get firstName() {
        return this.studentData.firstName
    }

    public get class() {
        return this.studentData.class
    }

    public toString() {
        return this.firstName + ' ' + this.name
    }
}

export function mapRawToObjFields(rawObj, fields) {
    const obj = {}
    // TODO clean up
    forOwn(fields, (value, key) => {
        if (isString(value)) {
            obj[key] = rawObj[value]
        } else if (isArray(value)) {
            obj[key] = []
            forOwn(value, (value2, key2) => {
                obj[key].push(rawObj[value2.column])
            })
        }
    })
    return obj
}

export function convertStudent(rawStudent, studentFields) {
    const studentData = mapRawToObjFields(rawStudent, studentFields)
    return new Student(studentData)
}

export function convertCourse(rawCourse, courseFields) {
    const courseData = mapRawToObjFields(rawCourse, courseFields)
    return new Course(courseData)
}
