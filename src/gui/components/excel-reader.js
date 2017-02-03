const {readExcel, getOverview} = require('../../core/index')

exports.excelReader = {
    template: `<div>
        <h2>Datei angeben</h2>
        <label for="file"></label>
        <input type="file" @change="loadExcel()" id="file">
        <slot></slot>
        </div>`,
    data: function() {
        return {
            filename: '',
            error: { message: ''}
        }
    },
    methods: {
        loadExcel: function () {
            // TODO solve this differently? electron puts the paths there..
            let filename = document.getElementById('file').files[0].path

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