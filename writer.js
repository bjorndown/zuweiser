function writeMatch({ students, courses }) {
    console.log('\n\n---- Auswertung\n')
    courses.forEach(course => {
        console.log('-- ' + course.name);
        course.students.forEach(student => console.log(student.name + ' ' + student.vorname));
        console.log('\n')
    });  
}

exports.writeMatch = writeMatch;