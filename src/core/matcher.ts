import find from 'lodash/find'
import uniq from 'lodash/uniq'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'

import { Course, Student } from './model'

export class NotUniqueError extends Error {
    public entityType: any
    public propertyName: any
    public entity: {}

    constructor(entityType, propertyName, entity = {}) {
        super(`${propertyName} not unique for entity ${entityType}`)
        Object.setPrototypeOf(this, NotUniqueError.prototype)
        this.entityType = entityType
        this.propertyName = propertyName
        this.entity = entity
    }
}

export class NotExistError extends Error {
    public entityType: any
    public id: any
    public referrer: {}

    constructor(entityType, id, referrer = {}) {
        super(
            `${entityType} with id=${id} does not exist. Referred to by ${referrer}.`
        )
        Object.setPrototypeOf(this, NotExistError.prototype)
        this.entityType = entityType
        this.id = id
        this.referrer = referrer
    }
}

export const getStudentsInPriorityOrder = (
    students: Student[],
    course: Course,
    totalNumOfPriorities: number
): Student[][] => {
    const studentsByPriority: Student[][] = range(
        totalNumOfPriorities
    ).map(() => [])

    for (const student of students) {
        studentsByPriority.forEach((priority, index) => {
            if (student.priorities[index] === course.id) {
                studentsByPriority[index].push(student)
            }
        })
    }

    return studentsByPriority
}

const getUnmatchedStudents = (students: Student[]): Student[] => {
    return students.filter((student) => !student.matched)
}

const getCoursesWithMinimumReached = (courses: Course[]): Course[] => {
    return courses.filter((course) => course.students.length >= course.minimum)
}

const getAssignableCourses = (courses: Course[]): Course[] => {
    return courses.filter((course) => course.limit > 0)
}

interface FillToMinimumConfiguration {
    priority: number
    index: number
}

export const getMinimalPriorityToFillToMinimum = (
    course: Course,
    studentsInOrder: Student[][],
    totalNumPriorities: number
): FillToMinimumConfiguration => {
    let currentPriority = 0
    const assignedStudents: Student[] = []
    const studentsInOrderCopy = studentsInOrder.map((students) =>
        students.slice(0)
    )
    while (
        assignedStudents.length < course.minimum &&
        studentsInOrderCopy.flat().length > 0 &&
        currentPriority < totalNumPriorities
    ) {
        if (
            studentsInOrderCopy[currentPriority].length === 0 &&
            currentPriority < totalNumPriorities
        ) {
            currentPriority = currentPriority + 1
        }

        assignedStudents.push(
            studentsInOrderCopy[currentPriority].shift() as Student
        )

        if (
            studentsInOrderCopy.flat().length === 0 &&
            assignedStudents.length < course.minimum
        ) {
            return { priority: -1, index: -1 }
        }

        if (assignedStudents.length === course.minimum) {
            break
        }
    }
    const index =
        studentsInOrder[currentPriority].length -
        studentsInOrderCopy[currentPriority].length -
        1
    return { priority: currentPriority, index }
}

export const tryToFillToMinimum = (
    course: Course,
    studentsInOrder: Student[][],
    minimalPriority: FillToMinimumConfiguration
): void => {
    for (const priority of range(minimalPriority.priority)) {
        for (const index of range(studentsInOrder[priority].length)) {
            const student = studentsInOrder[priority].shift() as Student
            if (!student.matched) {
                course.students.push(student)
                student.matched = true
            } else {
                console.warn(`${student.name} already matched!!`)
            }
        }
    }
    for (const index of range(minimalPriority.index + 1)) {
        const student = studentsInOrder[
            minimalPriority.priority
        ].shift() as Student
        if (!student.matched) {
            course.students.push(student)
            student.matched = true
        } else {
            console.warn(`${student.name} already matched!!`)
        }
    }
}

export const sortByDeltaToMinimum = (courses: Course[]): Course[] => {
    return courses.sort((course1, course2) => {
        const delta1 = course1.minimum - course1.students.length
        const delta2 = course2.minimum - course2.students.length
        return delta2 - delta1
    })
}

const sortByUnmatchedPriorities = (
    courses: Course[],
    students: Student[],
    totalNumOfPriorities: number
): Course[] => {
    return courses.sort((course1, course2) => {
        for (const priority of range(totalNumOfPriorities)) {
            const studentsInOrder1 = getStudentsInPriorityOrder(
                students,
                course1,
                totalNumOfPriorities
            )
            const studentsInOrder2 = getStudentsInPriorityOrder(
                students,
                course2,
                totalNumOfPriorities
            )
            if (
                getUnmatchedStudents(studentsInOrder2[priority]).length >
                getUnmatchedStudents(studentsInOrder1[priority]).length
            ) {
                return 1
            } else if (
                getUnmatchedStudents(studentsInOrder1[priority]).length >
                getUnmatchedStudents(studentsInOrder2[priority]).length
            ) {
                return -1
            }
        }
        return 0
    })
}

const analysePriorities = ({ students, courses, config }: Context) => {
    const assignableCourses = getAssignableCourses(courses)
    for (const course of assignableCourses) {
        const studentsInOrder = getStudentsInPriorityOrder(
            students,
            course,
            config.student.fields.priorities.length
        )
        console.log(course.name)
        const minimalPriority = getMinimalPriorityToFillToMinimum(
            course,
            studentsInOrder,
            config.student.fields.priorities.length
        )
        console.log(
            `Minimal priority to fill to minimum ${minimalPriority.priority +
                1}, index ${minimalPriority.index}`
        )
        for (const priority of range(config.student.fields.priorities.length)) {
            console.log(
                `Prio ${priority + 1}: ${studentsInOrder[priority].length}`
            )
        }
        tryToFillToMinimum(course, studentsInOrder, minimalPriority)
    }

    console.log('Second round')

    for (const course of sortByDeltaToMinimum(assignableCourses)) {
        const studentsInOrder = getStudentsInPriorityOrder(
            students,
            course,
            config.student.fields.priorities.length
        )
        const delta = course.minimum - course.students.length
        const studentsFlat = studentsInOrder.flat()

        console.log(`Try to fill delta ${delta} for ${course.name}`)

        while (
            studentsFlat.length > 0 &&
            course.minimum - course.students.length > 0
        ) {
            const student = studentsFlat.shift() as Student
            if (!student.matched) {
                course.students.push(student)
                student.matched = true
            } else {
                console.warn(`${student.name} already matched!!`)
            }
        }
    }

    console.log('final round')

    for (const course of sortByUnmatchedPriorities(
        assignableCourses,
        students,
        config.student.fields.priorities.length
    )) {
        console.log(course.name)
        const studentsInOrder = getStudentsInPriorityOrder(
            students,
            course,
            config.student.fields.priorities.length
        )
        for (const priority of range(config.student.fields.priorities.length)) {
            for (const index of range(studentsInOrder[priority].length)) {
                const student = studentsInOrder[priority].shift() as Student
                if (!student.matched && course.students.length < course.limit) {
                    course.students.push(student)
                    student.matched = true
                } else {
                    console.warn(`${student.name} already matched!!`)
                }
            }
        }
    }
}

interface Context {
    students: Student[]
    courses: Course[]
    config: WorksheetConfig
}

export interface WorksheetConfig {
    student: {
        shuffleBeforeMatch: boolean
        fields: {
            priorities: number[]
        }
    }
    courses: {
        shuffleBeforeMatch: boolean
    }
}

export function match({ students, courses, config }) {
    sanityCeck({ students, courses, config })

    const studentsToMatch = config.student.shuffleBeforeMatch
        ? shuffle(students)
        : students
    const coursesToMatch = config.courses.shuffleBeforeMatch
        ? getAssignableCourses(shuffle(courses))
        : getAssignableCourses(courses)

    analysePriorities({
        students: studentsToMatch,
        courses: coursesToMatch,
        config
    })

    return { students, courses, config }
}

export function assertParticipantsIdsAreUnique(students) {
    const idSet = new Set()
    students.forEach((student) => {
        if (idSet.has(student.id)) {
            throw new NotUniqueError('Participant', 'id', new Student({}))
        } else {
            idSet.add(student.id)
        }
    })
}

export function assertActivityIdsAreUnique(courses) {
    const idSet = new Set()
    courses.forEach((course) => {
        if (idSet.has(course.id)) {
            throw new NotUniqueError('Activity', 'id', new Course({}))
        } else {
            idSet.add(course.id)
        }
    })
}

export function assertChoicesPerParticipantAreUnique(students) {
    students.forEach((student) => {
        const originalLength = student.priorities.length
        const dedupedLength = uniq(student.priorities).length
        if (originalLength !== dedupedLength) {
            throw new NotUniqueError('Participant', 'priorities', student)
        }
    })
}

export function assertChosenActivitiesDoExist(students, courses) {
    const courseIds = courses.map((course) => course.id)
    students.forEach((student) => {
        student.priorities.forEach((priority) => {
            if (!find(courseIds, (courseId) => courseId === priority)) {
                throw new NotExistError('Activity', priority, student)
            }
        })
    })
}

export const sanityCeck = ({ students, courses }: Context) => {
    assertActivityIdsAreUnique(courses)
    assertParticipantsIdsAreUnique(students)
    assertChosenActivitiesDoExist(students, courses)
    assertChoicesPerParticipantAreUnique(students)
}
