// TODO why does the next line break things?
// const Vue = require('vue')
/* globals Vue */
const {readExcel, getOverview} = require('../core/reader')

const excelReader = {
    props: {
        //     filename: '',
        //     availableColumns: []
    },
    template: `<div>
        <h2>1. Datei angeben</h2>
        <label for="file"></label>
        <input type="file" id="file">
        <button @click="loadExcel()">Laden</button>
        <slot></slot>
        </div>`,
    methods: {
        loadExcel: function () {
            error = {}
            // TODO remove next line
            const filename = document.getElementById('file').value
            readExcel(filename)
                .then(getOverview)
                .then(sheets => this.$emit('excel-overview-loaded', sheets))
                .catch(e => error.message = e.toString())
        }
    }
}

const errorBanner = {
    props: ['error'],
    template: '<p style="color: red">{{ error.message }}</p>'
}

const multiselect = {
    props: ['config-item', 'values', 'value'],
    template: `<select @input="onSelected">
        <option>Bitte auswaehlen</option>
        <option v-for="selectableValue in values">{{selectableValue}}</option>
        </select>`,
    methods: {
        onSelected: function (event) {
            this.$emit('input', event.target.value)
        }
    }
}

Vue.component('am-multiselect', multiselect)

const activitiesSheetConfig = {
    props: ['excelOverview'],
    data: function () {
        return {
            activitiesConfig: {
                worksheet: '',
                fields: {
                    limit: '',
                    id: '',
                    name: ''
                }
            },
        }
    },
    template: `<div>
        <h3>Aktivitaeten</h3>
        <am-multiselect v-model="activitiesConfig.worksheet" :values="Object.keys(excelOverview)"></am-multiselect>
        <am-multiselect v-for="(field, key) in activitiesConfig.fields" v-model="activitiesConfig.fields[key]" :values="excelOverview[activitiesConfig.worksheet]"></am-multiselect>
        </div>`
}

const participantSheetConfig = {
    props: ['excelOverview'],
    data: function () {
        return {
            participantsConfig: {
                worksheet: '',
                fields: {
                    name: '',
                    firstName: ''
                }
            }
        }
    },
    template: `<div>
        <h3>Teilnehmer</h3>
        <am-multiselect v-model="participantsConfig.worksheet" :values="Object.keys(excelOverview)"></am-multiselect>
        <am-multiselect v-for="(field, key) in participantsConfig.fields" v-model="participantsConfig.fields[key]" :values="excelOverview[participantsConfig.worksheet]"></am-multiselect>
        </div>`
}
// TODO do it right
let error = { message: '' }

new Vue({
    el: '#app',
    data: {
        error,
        excelOverview: {}
    },
    components: {
        'am-error-banner': errorBanner,
        'am-excel-reader': excelReader,
        'am-activities-sheet-config': activitiesSheetConfig,
        'am-participants-sheet-config': participantSheetConfig,
    },
    methods: {
        onOverviewLoaded: function (excelOverview) {
            this.excelOverview = excelOverview
        }
    }
})