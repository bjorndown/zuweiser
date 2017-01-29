// TODO why does the next line break things?
// const Vue = require('vue')
/* globals Vue */
const {readExcel, getOverview, readCourses, readStudents, match} = require('../core/index')

const excelReader = {
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

const multiselect = {
    props: ['config-item', 'values', 'value', 'label'],
    template: `<div>
        <label>{{label}}</label>
        <select @input="onSelected">
        <option>Bitte auswaehlen</option>
        <option v-for="selectableValue in values">{{selectableValue}}</option>
        </select>
        </div>`,
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
                    id: '',
                    limit: '',
                    name: ''
                }
            },
            labels: {
                worksheet: 'Arbeitsblatt',
                id: 'ID',
                limit: 'Teilnehmerlimite',
                name: 'Kursname'
            }
        }
    },
    template: `<div>
        <h3>Aktivitaeten</h3>
        <h4>Arbeitsblatt</h4>
        <am-multiselect 
            v-model="activitiesConfig.worksheet" 
            :values="Object.keys(excelOverview)">
        </am-multiselect>
        <h4>Spalten</h4>
        <am-multiselect 
            v-if="activitiesConfig.worksheet"
            v-for="(field, key) in activitiesConfig.fields" 
            v-model="activitiesConfig.fields[key]" 
            :values="excelOverview[activitiesConfig.worksheet]"
            :label="labels[key]">
        </am-multiselect>
        </div>`
}

const participantSheetConfig = {
    props: ['excelOverview'],
    data: function () {
        return {
            participantsConfig: {
                worksheet: '',
                fields: {
                    id: '',
                    name: '',
                    firstName: '',
                    priority1: '',
                    priority2: '',
                    priority3: '',
                    // priority4: ''
                }

            },
            labels: {
                worksheet: 'Arbeitsblatt',
                id: 'ID',
                name: 'Name',
                firstName: 'Vorname',
                priority1: '1. Prioritaet',
                priority2: '2. Prioritaet',
                priority3: '3. Prioritaet',
                // priority4: '4. Prioritaet'
            }
        }
    },
    template: `<div>
        <h3>Teilnehmer</h3>
        <h4>Arbeitsblatt</h4>
        <am-multiselect 
            v-model="participantsConfig.worksheet" 
            :values="Object.keys(excelOverview)">
        </am-multiselect>
        <h4>Spalten</h4>
        <am-multiselect
            v-if="participantsConfig.worksheet" 
            v-for="(field, key) in participantsConfig.fields" 
            v-model="participantsConfig.fields[key]" 
            :values="excelOverview[participantsConfig.worksheet]"
            :label="labels[key]">
        </am-multiselect>
        </div>`
}
// TODO do it right
let error = { message: '' }

const matcher = {
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

new Vue({
    el: '#app',
    data: {
        error,
        excelOverview: null,
        matchConfig: null
    },
    components: {
        'am-excel-reader': excelReader,
        'am-activities-sheet-config': activitiesSheetConfig,
        'am-participants-sheet-config': participantSheetConfig,
        'am-do-matching': matcher
    },
    methods: {
        onOverviewLoaded: function (excelOverview) {
            this.excelOverview = excelOverview
        }
    }
})