/* eslint no-console: "off" */
function writeMatch({ courses }) {
    console.log('\n\n---- Auswertung\n')
    courses.forEach(course => {
        console.log('-- ' + course.name)
        course.students.forEach(student => console.log(student.toString()))
        console.log('\n')
    })
}

function writeMatchesToExcelWorksheet({ workbook, courses }) {
    const resultWorksheet = workbook.addWorksheet('Resultat')
    let currentRow = 0

    for (let activity of courses) {
        resultWorksheet.getRow(currentRow).getCell(1).value = activity.name
        currentRow = currentRow + 1

        for (let participant of activity.students) {
            resultWorksheet.getRow(currentRow).getCell(1).value = participant.toString()
            currentRow = currentRow + 1
        }

        currentRow = currentRow + 1

    }

    workbook.xlsx.writeFile('./resultat.xlsx')
}

exports.writeMatch = writeMatch
exports.writeMatchesToExcelWorksheet = writeMatchesToExcelWorksheet