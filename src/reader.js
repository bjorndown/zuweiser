const Excel = require('exceljs')
const _ = require('lodash')
const {log} = require('./log')

const workbook = new Excel.Workbook()

let skipFirstValueInRowMode = false

function getRowsAsObjects(workbook, worksheetName) {
    const worksheet = workbook.getWorksheet(worksheetName)
    const headerColumns = readHeaderColumns(worksheet)
    writeHeaderColumnsToWorksheet(worksheet, headerColumns)
    return readRows(worksheet, headerColumns)
}

function readHeaderColumns(worksheet) {
    const firstRow = worksheet.getRow(1).values

    if (_.isEmpty(firstRow[0])) {
        log.warn('Ignoring first value in every row since it was empty in header row.')
        skipFirstValueInRowMode = true
    }
    
    return skipFirstValueInRowMode ? firstRow.splice(1) : firstRow 
}

function writeHeaderColumnsToWorksheet(worksheet, headerColumns) {
    worksheet.columns = headerColumns.map(header =>  {
        return { header: header, key: header }
    })
}

function readRows(worksheet, headerColumns) {
    const rowObjects = []
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            const values = skipFirstValueInRowMode ? row.values.splice(1) : row.skipFirstValueMode
            const rowObj = _.zipObject(headerColumns, values)
            rowObjects.push(rowObj)
        }
    })
    return rowObjects
}

function readExcel(filename) {
    return workbook.xlsx.readFile(filename)
}

exports.getRowsAsObjects = getRowsAsObjects
exports.readExcel = readExcel