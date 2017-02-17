/* eslint no-console: "off" */
export function writeMatch({ courses }) {
    console.log('\n\n---- Auswertung\n')
    courses.forEach(course => {
        console.log('-- ' + course.name)
        course.students.forEach(student => console.log(student.toString()))
        console.log('\n')
    })
}