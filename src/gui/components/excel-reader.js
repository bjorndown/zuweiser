const {readExcel, getOverview} = require('../../core/index')

exports.excelReader = {
    template: `<div>
        <h2>Datei angeben</h2>
        <label for="file"></label>
        <input type="file" @change="loadExcel($event.target.value)" id="file">
        <slot></slot>
        </div>`,
    data: function() {
        return {
            filename: ''
        }
    },
    methods: {
        loadExcel: function (filename) {
            error = {}
            readExcel(filename)
                .then(getOverview)
                .then(sheets => this.$emit('excel-overview-loaded', sheets))
                .catch(e => error.message = e.toString())
        }
    }
}