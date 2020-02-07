import XLSX, { WorkBook, WorkSheet } from 'xlsx'

export function getRowsAsObjects(workbook: WorkBook, worksheetName: string) {
    const worksheet = workbook.Sheets[worksheetName]
    const headerColumns = readHeaderColumns(worksheet)
    return readRows(worksheet)
}

function readHeaderColumns(worksheet: WorkSheet) {
    // FIXME any
    const rowsInSheet: any = XLSX.utils.sheet_to_json(worksheet)
    return Object.keys(rowsInSheet[0])
}

function readRows(worksheet: WorkSheet) {
    return XLSX.utils.sheet_to_json(worksheet)
}

export function readExcel(file: Blob) {
    const reader = new FileReader()
    const promise = new Promise(function(resolve, reject) {
        reader.onload = function(e: any) {
            // FIXME
            const data = e.target.result
            try {
                const wb = XLSX.read(data, { type: 'binary' })
                resolve(wb)
            } catch (e) {
                reject(e)
            }
        }
    })
    reader.readAsBinaryString(file)
    return promise
}

export function getOverview(workbook: WorkBook) {
    const excelOverview: { [key: string]: string[] } = {}
    for (const sheetName of workbook.SheetNames) {
        // FIXME any
        const rowsInSheet: any = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheetName]
        )
        excelOverview[sheetName] = Object.keys(rowsInSheet[0])
    }
    return { sheets: excelOverview }
}
