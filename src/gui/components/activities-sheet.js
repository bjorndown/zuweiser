exports.activitiesSheetConfig = {
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
        {{activitiesConfig}}
        <am-multiselect 
            v-model="activitiesConfig.worksheet" 
            @input="onChange"
            :values="Object.keys(excelOverview)">
        </am-multiselect>
        <h4>Spalten</h4>
        <am-multiselect 
            v-if="activitiesConfig.worksheet"
            v-for="(field, key) in activitiesConfig.fields" 
            v-model="activitiesConfig.fields[key]" 
            @input="onChange"
            :values="excelOverview[activitiesConfig.worksheet]"
            :label="labels[key]">
        </am-multiselect>
        </div>`,
    methods: {
        onChange: function() {
            if (this.activitiesConfig.worksheet) {
                this.$emit('completed', this.activitiesConfig)
            }
        }
    }
}