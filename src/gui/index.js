// TODO why does the next line break things?
// const Vue = require('vue')
/* globals Vue */
const {activitiesSheetConfig} = require('./components/activities-sheet')
const {excelReader} = require('./components/excel-reader')
const {participantSheetConfig} = require('./components/participants-sheet')
const {matcher} = require('./components/matcher')
const {multiselect} = require('./components/multiselect')

Vue.component('am-multiselect', multiselect)

new Vue({
    el: '#app',
    data: {
        excelOverview: null,
        matchConfig: { activities: {}, participants: {} }
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
        },
        activitiesConfigCompleted: function(activitiesSheetConfig) {
            this.matchConfig.activities = activitiesSheetConfig
        },
        participantsConfigCompleted: function(participantSheetConfig) {
            this.matchConfig.participants = participantSheetConfig
        }
    }
})