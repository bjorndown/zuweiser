const _ = require('lodash');

function mapRawToObjFields(rawObj, fields) {
    let obj = {};
    // TODO clean up
    _.forOwn(fields, (value, key) => {
        if (_.isString(value)) {
            obj[key] = rawObj[value];
        } else if (_.isArray(value)) {
            obj[key] = [];
            _.forOwn(value, (value2, key2) => {
                obj[key].push(rawObj[value2.column]);
            });
        }
    });
    return obj;
}

function convertStudent(rawStudent, studentFields) {
    let student = mapRawToObjFields(rawStudent, studentFields);
    // TODO move to class?
    student.toString = function() { return this.firstName + ' ' + this.name };
    student.unmatchedPriorities = function*() {
        let index = 0;
        while (this.matched === false && index < this.priorities.length) {
            console.log('Matching priority ' + index + ' for ' + this)
            yield this.priorities[index];
            index = index + 1;
        } 
    };
    student.matched = false;
    return student;
}

function convertCourse(rawCourse, courseFields) {
    let course = mapRawToObjFields(rawCourse, courseFields);
    // TODO move to class?
    course.students = [];
    course.waitingList = [];
    course.toString = function() { return this.name };
    return course;
}

exports.convertStudent = convertStudent;
exports.convertCourse = convertCourse;
