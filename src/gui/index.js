import Vue from 'vue'
import {activitiesSheetConfig} from './components/activities-sheet.vue'
import {excelReader} from './components/excel-reader.vue'
import {participantSheetConfig} from './components/participants-sheet.vue'
import {matcher} from './components/matcher.vue'
import {multiselect} from './components/multiselect.vue'

Vue.component('am-multiselect', multiselect)

new Vue({
    el: '#app',
    data: {
        excelOverview: null,
        matchConfig: { filename: '', courses: {}, student: {} },
        result: {}
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
            this.matchConfig.filename = excelOverview.filename
        },
        activitiesConfigCompleted: function(activitiesSheetConfig) {
            this.matchConfig.courses = activitiesSheetConfig
        },
        participantsConfigCompleted: function(participantSheetConfig) {
            this.matchConfig.student = participantSheetConfig
        },
        onMatched: function(result) {
            this.result = result
        }
    }
})