<template>
    <div>
        <h3>Aktivitäten</h3>
        <h4>Arbeitsblatt</h4>
        <am-multiselect v-model="activitiesConfig.worksheet" @input="onChange"
                        :values="Object.keys(excelOverview.sheets)">
        </am-multiselect>
        <template v-if="activitiesConfig.worksheet">
            <h4>Spalten</h4>
            <am-multiselect v-for="(field, key) in activitiesConfig.fields"
                            :key="field.id" v-model="activitiesConfig.fields[key]"
                            @input="onChange" :values="excelOverview.sheets[activitiesConfig.worksheet]"
                            :label="labels[key]">
            </am-multiselect>
        </template>
    </div>
</template>

<script>
    export default {
        props: ['excelOverview'],
        data() {
            return {
                activitiesConfig: {
                    worksheet: '',
                    fields: {
                        id: '',
                        name: '',
                        limit: ''
                    }
                },
                labels: {
                    worksheet: 'Arbeitsblatt',
                    id: 'ID',
                    name: 'Kursname',
                    limit: 'Teilnehmerlimite'
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

<style scoped>

</style>
