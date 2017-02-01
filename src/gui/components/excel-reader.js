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
            readExcel(filename)
                .then(getOverview)
                .then(overview => {
                    // TODO maybe do this in getOverview?! 
                    overview.filename = filename
                    return overview
                })
                .then(overview => this.$emit('excel-overview-loaded', overview))
                .catch(e => this.error.message = e.toString())
        }
    }
}