exports.participantSheetConfig = {
    props: ['excelOverview'],
    data: function () {
        return {
            participantsConfig: {
                worksheet: '',
                fields: {
                    id: '',
                    name: '',
                    firstName: '',
                    priority1: '',
                    priority2: '',
                    priority3: '',
                    // priority4: ''
                }

            },
            labels: {
                worksheet: 'Arbeitsblatt',
                id: 'ID',
                name: 'Name',
                firstName: 'Vorname',
                priority1: '1. Prioritaet',
                priority2: '2. Prioritaet',
                priority3: '3. Prioritaet',
                // priority4: '4. Prioritaet'
            }
        }
    },
    template: `<div>
        <h3>Teilnehmer</h3>
        
        <h4>Arbeitsblatt</h4>
        <am-multiselect 
            v-model="participantsConfig.worksheet" 
            @input="onChange"
            :values="Object.keys(excelOverview)">
        </am-multiselect>

        <h4>Spalten</h4>
        <am-multiselect
            v-if="participantsConfig.worksheet" 
            v-for="(field, key) in participantsConfig.fields" 
            v-model="participantsConfig.fields[key]" 
            @input="onChange"
            :values="excelOverview[participantsConfig.worksheet]"
            :label="labels[key]">
        </am-multiselect>
        </div>`,
    methods: {
        onChange: function() {
            if (this.participantsConfig.worksheet) {
                this.$emit('completed', this.participantsConfig)
            }
        }
    }
}