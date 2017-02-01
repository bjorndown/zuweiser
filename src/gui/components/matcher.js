const {readExcel, readCourses, readStudents, match} = require('../../core/index')

exports.matcher = {
    props: ['config'],
    template: `<div>
        Config: {{config}}
        <p style="color: red">{{error.w}}</p>
        <button v-if="config.student && config.courses" @click="matchAndWrite">do it</button>
        Result: {{result}}
    </div>`,
    data: function() {
        return {
            result: {},
            error: {},
        }
    },
    methods: {
        matchAndWrite: function() {
            readExcel(this.config.filename)
                .then(workbook => { return { workbook: workbook, config: this.config } })
                .then(readCourses)
                .then(readStudents)
                .then(match)
                .then(function(result) {
                    console.dir(result)
                    this.result = result
                })
                .catch(function(error) { 
                    this.error = error
                })
        }
    }
}