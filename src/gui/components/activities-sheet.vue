<template>
    <div>
        <h3>Aktivitäten</h3>
        <label for="shuffleActivitiesBeforeMatch">
            Vor dem Zuweisen mischen
            <Explanation text="Ohne Mischen ist die Reihenfolge der Einträge in der Tabelle massgebend, d.h. frühe Einträge werden bevorzugt"/>
        </label>
        <input type="checkbox" name="shuffleActivitiesBeforeMatch" id="shuffleActivitiesBeforeMatch" v-model="activitiesConfig.shuffleBeforeMatch">
        <h4>Arbeitsblatt</h4>
        <am-multiselect
            v-model="activitiesConfig.worksheet"
            @input="onChange"
            :values="Object.keys(excelOverview.sheets)"
        >
        </am-multiselect>
        <template v-if="activitiesConfig.worksheet">
            <h4>Spalten</h4>
            <am-multiselect
                v-for="(field, key) in activitiesConfig.fields"
                :key="field.id"
                v-model="activitiesConfig.fields[key]"
                @input="onChange"
                :values="excelOverview.sheets[activitiesConfig.worksheet]"
                :label="labels[key]"
            >
            </am-multiselect>
        </template>
    </div>
</template>

<script>
import Explanation from '@/gui/components/explanation'
export default {
    components: {Explanation},
    props: ['excelOverview'],
    data() {
        return {
            activitiesConfig: {
                shuffleBeforeMatch: false,
                worksheet: '',
                fields: {
                    id: '',
                    name: '',
                    limit: '',
                    minimum: ''
                }
            },
            labels: {
                worksheet: 'Arbeitsblatt',
                id: 'ID',
                name: 'Name',
                limit: 'Limit',
                minimum: 'Minimum'
            }
        }
    },
    methods: {
        onChange() {
            if (this.activitiesConfig.worksheet) {
                this.$emit('completed', this.activitiesConfig)
            }
        }
    }
}
</script>

<style scoped></style>
