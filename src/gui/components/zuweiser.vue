<template>
    <div class="container">
        <div class="row">
            <am-excel-reader @excel-overview-loaded="onOverviewLoaded" class="col-md-12">
            </am-excel-reader>
        </div>

        <div v-if="excelOverview" class="row">
            <h2 class="col-md-12">Blätter &amp; Spalten auswählen</h2>

            <am-activities-sheet-config @completed="activitiesConfigCompleted" :excel-overview="excelOverview" class="col-md-6">
            </am-activities-sheet-config>

            <am-participants-sheet-config @completed="participantsConfigCompleted" :excel-overview="excelOverview" class="col-md-6">
            </am-participants-sheet-config>
        </div>

        <div class="row">
            <am-do-matching :config="matchConfig" @matched="onMatched" class="col-md-12">
            </am-do-matching>
        </div>

        <div class="row">
            <am-result-printer :result="result" class="col-md-12"></am-result-printer>
        </div>
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