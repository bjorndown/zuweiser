const {readExcel, readCourses, readStudents, match} = require('../../core/index')

exports.matcher = {
    props: {
        config: {}
    },
    template: `<div>
        <p style="color: red">{{error}}</p>
        <button @click="matchAndWrite">do it</button>
        {{result}}
    </div>`,
    data: function() {
        return {
            result: {},
            error: null
        }
    },
    methods: {
        matchAndWrite: function() {
            readExcel(this.config.filename)
                .then(readStudents)
                .then(readCourses)
                .then(match)
                .then(function(result) {
                    this.result = result
                })
                .catch(function(error) { 
                    this.error = error
                })
        }
    }
}