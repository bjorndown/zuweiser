// NOTE requiring js-xlsx does not work because of "fs"
/* globals XLSX */

export function getRowsAsObjects(workbook, worksheetName) {
    const worksheet = workbook.Sheets[worksheetName]
    const headerColumns = readHeaderColumns(worksheet)
    return readRows(worksheet, headerColumns)
}

function readHeaderColumns(worksheet) {
    let rowsInSheet = XLSX.utils.sheet_to_row_object_array(worksheet)
    return Object.keys(rowsInSheet[0])
}

function readRows(worksheet) {
    return XLSX.utils.sheet_to_row_object_array(worksheet)
}

export function readExcel(file) {
    let reader = new FileReader()
    let promise = new Promise(function (resolve, reject) {
        reader.onload = function (e) {
            var data = e.target.result
            try {
                let wb = XLSX.read(data, { type: 'binary' })
                resolve(wb)
            } catch (e) {
                reject(e)
            }
        }

    })
    reader.readAsBinaryString(file)
    return promise
}

export function getOverview(workbook) {
    let excelOverview = {}
    for (let sheetName of workbook.SheetNames) {
        let rowsInSheet = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
        excelOverview[sheetName] = Object.keys(rowsInSheet[0])
    }
    return { sheets: excelOverview }
}