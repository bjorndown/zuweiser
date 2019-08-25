import XLSX, {WorkBook, WorkSheet} from 'xlsx';

export function getRowsAsObjects(workbook: WorkBook, worksheetName: string) {
    const worksheet = workbook.Sheets[worksheetName]
    const headerColumns = readHeaderColumns(worksheet)
    return readRows(worksheet)
}

function readHeaderColumns(worksheet: WorkSheet) {
    // FIXME any
    let rowsInSheet: any = XLSX.utils.sheet_to_json(worksheet)
    return Object.keys(rowsInSheet[0])
}

function readRows(worksheet: WorkSheet) {
    return XLSX.utils.sheet_to_json(worksheet)
}

export function readExcel(file: Blob) {
    let reader = new FileReader()
    let promise = new Promise(function (resolve, reject) {
        reader.onload = function (e: any) { // FIXME
            const data = e.target.result
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

export function getOverview(workbook: WorkBook) {
    let excelOverview: { [key: string]: string[]} = {}
    for (let sheetName of workbook.SheetNames) {
        // FIXME any
        let rowsInSheet: any = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        excelOverview[sheetName] = Object.keys(rowsInSheet[0])
    }
    return { sheets: excelOverview }
}
