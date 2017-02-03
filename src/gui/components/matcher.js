const {readExcel, readCourses, readStudents, match} = require('../../core/index')
const {log} = require('../../core/log')

exports.matcher = {
    props: ['config'],
    template: `<div>
        <p style="color: red">{{error.w}}</p>
        <button v-if="config.student && config.courses" @click="matchAndWrite">Prioritaeten aufloesen</button>
    </div>`,
    data: function() {
        return {
            error: {}
        }
    },
    methods: {
        matchAndWrite: function() {
            readExcel(this.config.filename)
                .then(workbook => { return { workbook: workbook, config: this.config } })
                .then(readCourses)
                .then(readStudents)
                .then(match)
                .then(result => {
                    this.$emit('matched', result)
                })
                .catch(error => { 
                    this.error = error
                })
        }
    }
}