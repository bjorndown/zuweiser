<template>
    <div>
        <p style="color: red">{{error.message}}</p>
        <button v-if="config.student && config.courses" @click="matchAndWrite">Prioritaeten aufloesen</button>
    </div>
</template>

<script>
    import { readExcel, readCourses, readStudents, match } from '../../core/index'

    export var matcher = {
        props: ['config'],
        data: function () {
            return {
                error: {}
            }
        },
        methods: {
            matchAndWrite: function () {
                this.error = {}

                readExcel(this.config.filename)
                    .then(workbook => { return { workbook: workbook, config: this.config } })
                    .then(readCourses)
                    .then(readStudents)
                    .then(match)
                    .then(result => this.$emit('matched', result))
                    .catch(error => {
                        this.error = error
                    })
            }
        }
    }
</script>