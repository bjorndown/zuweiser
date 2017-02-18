<template>
    <div>
        <am-excel-reader @excel-overview-loaded="onOverviewLoaded">
        </am-excel-reader>

        <div v-if="excelOverview">
            <h2>Blaetter &amp; Spalten auswaehlen</h2>

            <am-activities-sheet-config @completed="activitiesConfigCompleted" :excel-overview="excelOverview">
            </am-activities-sheet-config>

            <am-participants-sheet-config @completed="participantsConfigCompleted" :excel-overview="excelOverview">
            </am-participants-sheet-config>
        </div>

        <am-do-matching :config="matchConfig" @matched="onMatched">
        </am-do-matching>

        <am-result-printer :result="result"></am-result-printer>
    </div>
</template>

<script>
    import Vue from 'vue'

    import activitiesSheetConfig from './activities-sheet.vue'
    import excelReader from './excel-reader.vue'
    import participantSheetConfig from './participants-sheet.vue'
    import matcher from './matcher.vue'
    import multiselect from './multiselect.vue'
    import resultPrinter from './result-printer.vue'

    Vue.component('am-multiselect', multiselect)

    export default {
        data() {
            return {
                excelOverview: null,
                matchConfig: { filename: null, courses: null, student: null },
                result: { courses: null }
            }
        },
        components: {
            'am-excel-reader': excelReader,
            'am-activities-sheet-config': activitiesSheetConfig,
            'am-participants-sheet-config': participantSheetConfig,
            'am-do-matching': matcher,
            'am-result-printer': resultPrinter
        },
        methods: {
            onOverviewLoaded: function (excelOverview) {
                this.excelOverview = excelOverview
                this.matchConfig.filename = excelOverview.filename
            },
            activitiesConfigCompleted: function (activitiesSheetConfig) {
                this.matchConfig.courses = activitiesSheetConfig
            },
            participantsConfigCompleted: function (participantSheetConfig) {
                this.matchConfig.student = participantSheetConfig
            },
            onMatched: function (result) {
                this.result = result
            }
        }
    }

</script>