<template>
    <div>
        <h1>Zuweiser</h1>
        <am-excel-reader @excel-overview-loaded="onOverviewLoaded">
        </am-excel-reader>

        <div v-if="excelOverview" id="sheet-config">
            <h2 id="config-header">Blätter &amp; Spalten auswählen</h2>

            <am-activities-sheet-config
                id="config-activities"
                @completed="activitiesConfigCompleted"
                :excel-overview="excelOverview"
            >
            </am-activities-sheet-config>

            <am-participants-sheet-config
                id="config-participants"
                @completed="participantsConfigCompleted"
                :excel-overview="excelOverview"
            >
            </am-participants-sheet-config>
        </div>

        <am-do-matching :config="matchConfig" @matched="onMatched">
        </am-do-matching>
        <am-result-printer :result="result"></am-result-printer>
    </div>
</template>

<script>
import Vue from 'vue'

import activitiesSheetConfigComponent from './components/activities-sheet.vue'
import excelReaderComponent from './components/excel-reader.vue'
import participantSheetConfigComponent from './components/participants-sheet.vue'
import matcherComponent from './components/matcher.vue'
import multiselectComponent from './components/multiselect.vue'
import resultPrinterComponent from './components/result-printer.vue'

Vue.component('am-multiselect', multiselectComponent)

export default {
    data() {
        return {
            excelOverview: null,
            matchConfig: { filename: null, courses: null, student: null },
            result: { courses: null }
        }
    },
    components: {
        'am-excel-reader': excelReaderComponent,
        'am-activities-sheet-config': activitiesSheetConfigComponent,
        'am-participants-sheet-config': participantSheetConfigComponent,
        'am-do-matching': matcherComponent,
        'am-result-printer': resultPrinterComponent
    },
    methods: {
        onOverviewLoaded(excelOverview) {
            this.excelOverview = excelOverview
            this.matchConfig.filename = excelOverview.filename
        },
        activitiesConfigCompleted(activitiesSheetConfig) {
            this.matchConfig.courses = activitiesSheetConfig
        },
        participantsConfigCompleted(participantSheetConfig) {
            this.matchConfig.student = participantSheetConfig
        },
        onMatched(result) {
            this.result = result
        }
    }
}
</script>

<style>
label {
    margin-right: 1em;
}

select {
    margin-bottom: 0.6em;
}

#sheet-config {
    display: grid;
    grid-area: config;
    grid-template-columns: 40% 60%;
    grid-template-areas:
        'header header'
        'activities  participants';
}

#config-header {
    grid-area: header;
}

#config-activities {
    grid-area: activities;
}
#config-participants {
    grid-area: participants;
}
</style>
