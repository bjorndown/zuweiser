<template>
    <div>
        <p style="color: red">{{ errorMessage }}</p>
        <button v-if="config.student && config.courses" @click="matchAndWrite">
            Prioritäten auflösen
        </button>
    </div>
</template>

<script>
import { match, readCourses, readExcel, readStudents } from '../../core'
import { translateException } from '../translation'

export default {
    props: ['config'],
    data() {
        return {
            errorMessage: ''
        }
    },
    methods: {
        matchAndWrite() {
            this.errorMessage = ''

            readExcel(this.config.filename)
                .then((workbook) => {
                    return { workbook, config: this.config }
                })
                .then(readCourses)
                .then(readStudents)
                .then(match)
                .then((result) => this.$emit('matched', result))
                .catch((error) => {
                    this.errorMessage = translateException(error)
                    throw error
                })
        }
    }
}
</script>
