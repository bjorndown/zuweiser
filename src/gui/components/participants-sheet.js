const _ = require('lodash')

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
                    class: '',
                    priorities: [{ column: '' }, { column: '' }, { column: '' }]
                }

            },
            labels: {
                worksheet: 'Arbeitsblatt',
                id: 'ID',
                name: 'Name',
                firstName: 'Vorname',
                class: 'Klasse',
                priorities: 'Prioritaet'
            }
        }
    },
    template: `<div>
        <h3>Teilnehmer</h3>
        
        <h4>Arbeitsblatt</h4>
        <am-multiselect 
            v-model="participantsConfig.worksheet" 
            @input="onChange"
            :values="Object.keys(excelOverview.sheets)">
        </am-multiselect>

        <h4>Spalten</h4>
        <am-multiselect
            v-if="participantsConfig.worksheet" 
            v-for="(field, key) in notPriorities(participantsConfig.fields)" 
            v-model="participantsConfig.fields[key]" 
            @input="onChange"
            :values="excelOverview.sheets[participantsConfig.worksheet]"
            :label="labels[key]">
        </am-multiselect>

        <am-multiselect
            v-if="participantsConfig.worksheet" 
            v-for="(priority, index) in participantsConfig.fields.priorities" 
            v-model="participantsConfig.fields.priorities[index].column" 
            @input="onChange"
            :values="excelOverview.sheets[participantsConfig.worksheet]"
            :label="(index + 1) + '. ' + labels['priorities']">
        </am-multiselect>
        </div>`,
    methods: {
        onChange: function() {
            if (this.participantsConfig.worksheet) {
                this.$emit('completed', this.participantsConfig)
            }
        },
        // TODO really??
        notPriorities: function() {
            return _.pickBy(this.participantsConfig.fields, (value, key) => key !== 'priorities')
        }
    }
}