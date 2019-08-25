<template>
    <div>
        <h3>Teilnehmer</h3>

        <h4>Arbeitsblatt</h4>
        <am-multiselect v-model="participantsConfig.worksheet" @input="onChange" :values="Object.keys(excelOverview.sheets)">
        </am-multiselect>

        <h4>Spalten</h4>
        <am-multiselect v-if="participantsConfig.worksheet" v-for="(field, key) in notPriorities(participantsConfig.fields)" :key="field.id" v-model="participantsConfig.fields[key]"
            @input="onChange" :values="excelOverview.sheets[participantsConfig.worksheet]" :label="labels[key]">
            </am-multiselect>
        
        <div v-if="participantsConfig.worksheet" v-for="(priority, index) in participantsConfig.fields.priorities">

            <label>{{(index + 1) + '. ' + labels['priorities']}}</label>
            <select @input="onChange" v-model="participantsConfig.fields.priorities[index].column">
                <option v-for="selectableValue in excelOverview.sheets[participantsConfig.worksheet]">{{selectableValue}}</option>
            </select>
            <button @click="removePriority(index)">-</button>
        </div>
        <button @click="addPriority()">Priorität hinzufügen</button>
    </div>
</template>

<script>
    import * as _ from 'lodash'

    export default {
        props: ['excelOverview'],
        data() {
            return {
                participantsConfig: {
                    worksheet: '',
                    fields: {
                        id: '',
                        name: '',
                        firstName: '',
                        class: '',
                        priorities: [{ column: null }, { column: null }, { column: null }]
                    }

                },
                labels: {
                    worksheet: 'Arbeitsblatt',
                    id: 'ID',
                    name: 'Name',
                    firstName: 'Vorname',
                    class: 'Klasse',
                    priorities: 'Priorität'
                }
            }
        },
        methods: {
            onChange() {
                if (this.participantsConfig.worksheet) {
                    this.$emit('completed', this.participantsConfig)
                }
            },
            // TODO really??
            notPriorities() {
                return _.pickBy(this.participantsConfig.fields, (value, key) => key !== 'priorities')
            },
            removePriority(index) {
                this.participantsConfig.fields.priorities.splice(index, 1)
            },
            addPriority: function() {
                this.participantsConfig.fields.priorities.push({ column: null })
            }
        }
    }

</script>
