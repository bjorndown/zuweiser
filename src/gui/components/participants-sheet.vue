<template>
    <div>
        <h3>Teilnehmer</h3>

        <label for="shuffleStudentsBeforeMatch">
            Vor dem Zuweisen mischen
            <Explanation text="Ohne Mischen ist die Reihenfolge der Einträge in der Tabelle massgebend, d.h. frühe Einträge werden bevorzugt"/>
        </label>
        <input type="checkbox" name="shuffleStudentsBeforeMatch" id="shuffleStudentsBeforeMatch" v-model="participantsConfig.shuffleBeforeMatch">

        <h4>Arbeitsblatt</h4>
        <am-multiselect
            v-model="participantsConfig.worksheet"
            @input="onChange"
            :values="Object.keys(excelOverview.sheets)"
        >
        </am-multiselect>

        <template v-if="participantsConfig.worksheet">
            <h4>Spalten</h4>
            <am-multiselect
                v-for="(field, key) in notPriorities(participantsConfig.fields)"
                :key="field.id"
                v-model="participantsConfig.fields[key]"
                @input="onChange"
                :values="excelOverview.sheets[participantsConfig.worksheet]"
                :label="labels[key]"
            >
            </am-multiselect>

            <div
                v-for="(priority, index) in participantsConfig.fields
                    .priorities"
            >
                <label>{{ index + 1 + '. ' + labels['priorities'] }}</label>
                <select
                    @input="onChange"
                    v-model="participantsConfig.fields.priorities[index].column"
                >
                    <option
                        v-for="selectableValue in excelOverview.sheets[
                            participantsConfig.worksheet
                        ]"
                    >
                        {{ selectableValue }}
                    </option>
                </select>
                <button class="remove-priority" @click="removePriority(index)">
                    -
                </button>
            </div>
            <button @click="addPriority()">Priorität hinzufügen</button>
        </template>
    </div>
</template>

<script>
import omit from 'lodash/omit'
import Explanation from '@/gui/components/explanation'

export default {
    components: {Explanation},
    props: ['excelOverview'],
    data() {
        return {
            participantsConfig: {
                worksheet: '',
                shuffleBeforeMatch: true,
                fields: {
                    id: '',
                    name: '',
                    firstName: '',
                    class: '',
                    priorities: []
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
                this.participantsConfig.fields.priorities = this.populatePriorities()
                this.$emit('completed', this.participantsConfig)
            }
        },
        notPriorities() {
            return omit(this.participantsConfig.fields, 'priorities')
        },
        removePriority(index) {
            this.participantsConfig.fields.priorities.splice(index, 1)
        },
        addPriority() {
            this.participantsConfig.fields.priorities.push({ column: null })
        },
        populatePriorities() {
            const participantsColumns = this.excelOverview.sheets[
                this.participantsConfig.worksheet
            ]
            const wordThatEndsWithNumber = /^[\w\s]+[0-9]+$/
            return participantsColumns
                .filter((column) => wordThatEndsWithNumber.test(column))
                .map((column) => ({ column }))
        }
    }
}
</script>

<style scoped>
.remove-priority {
    margin-left: 0.6em;
}
</style>
