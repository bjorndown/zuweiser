const {readExcel, readCourses, readStudents, match, writeMatchesToExcelWorksheet} = require('../../core/index')

exports.matcher = {
    props: ['config'],
    template: `<div>
        <p style="color: red">{{error.message}}</p>
        <button v-if="config.student && config.courses" @click="matchAndWrite">Prioritaeten aufloesen</button>
    </div>`,
    data: function() {
        return {
            error: {}
        }
    },
    methods: {
        matchAndWrite: function() {
            this.error = {}

            readExcel(this.config.filename)
                .then(workbook => { return { workbook: workbook, config: this.config } })
                .then(readCourses)
                .then(readStudents)
                .then(match)
                .then(writeMatchesToExcelWorksheet)
                .catch(error => { 
                    this.error = error
                })
        }
    }
}