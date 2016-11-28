const Excel = require('exceljs')
const _ = require('lodash')

const workbook = new Excel.Workbook()

function getRowsAsObjects(workbook, worksheetName) {
    const worksheet = workbook.getWorksheet(worksheetName)
    const header = worksheet.getRow(1).values.splice(1)

    worksheet.columns = header.map(header =>  { 
        return { header: header, key: header }
    })

    const objects = []

    workbook.getWorksheet(worksheetName).eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            const rowObj = _.zipObject(header, row.values.splice(1))
            objects.push(rowObj)
        }
    })

    return objects
}

function readExcel(filename) {
    return workbook.xlsx.readFile(filename)
}

exports.getRowsAsObjects = getRowsAsObjects
exports.readExcel = readExcel