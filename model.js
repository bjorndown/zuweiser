const _ = require('lodash');

function mapRawToObjFields(rawObj, fields) {
    let obj = {};
    _.forOwn(fields, (value, key) => {
        obj[key] = rawObj[value];
    });
    return obj;
}

function convertStudent(rawStudent, studentFields) {
    let student = mapRawToObjFields(rawStudent, studentFields);
    student.toString = function() { return this.firstName + ' ' + this.name };
    student.matched = false;
    return student;
}

function convertCourse(rawCourse, courseFields) {
    let course = mapRawToObjFields(rawCourse, courseFields);
    course.students = [];
    course.waitingList = [];
    course.toString = function() { return this.name };
    return course;
}

exports.convertStudent = convertStudent;
exports.convertCourse = convertCourse;
