import Vue from 'vue'
import {activitiesSheetConfig} from './components/activities-sheet'
import {excelReader} from './components/excel-reader'
import {participantSheetConfig} from './components/participants-sheet'
import {matcher} from './components/matcher'
import {multiselect} from './components/multiselect'

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