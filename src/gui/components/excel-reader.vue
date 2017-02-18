<template>
    <div>
        <h2>Datei angeben</h2>
        <label for="file"></label>
        <input type="file" @change="loadExcel" id="file">
        <slot></slot>
    </div>
</template>

<script>
    import { readExcel, getOverview } from '../../core/index'

    export default {
        data() {
            return {
                filename: '',
                error: { message: '' }
            }
        },
        methods: {
            loadExcel(e) {
                let fileBlob = e.target.files[0]

                readExcel(fileBlob)
                    .then(getOverview)
                    .then(overview => {
                        // TODO maybe do this in getOverview?! 
                        // TODO rename, since its a blob
                        overview.filename = fileBlob
                        return overview
                    })
                    .then(overview => this.$emit('excel-overview-loaded', overview))
                    .catch(e => this.error.message = e.toString())
            }
        }
    }

</script>