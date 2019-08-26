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

    import activitiesSheetConfigComponent from './activities-sheet.vue'
    import excelReaderComponent from './excel-reader.vue'
    import participantSheetConfigComponent from './participants-sheet.vue'
    import matcherComponent from './matcher.vue'
    import multiselectComponent from './multiselect.vue'
    import resultPrinterComponent from './result-printer.vue'

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
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
    }
    .one {
        grid-column: 1 / 3;
        grid-row: 1;
    }
    .two {
        grid-column: 2 / 4;
        grid-row: 1 / 3;
    }
    .three {
        grid-column: 1;
        grid-row: 2 / 5;
    }
    .four {
        grid-column: 3;
        grid-row: 3;
    }
    .five {
        grid-column: 2;
        grid-row: 4;
    }
    .six {
        grid-column: 3;
        grid-row: 4;
    }
</style>
