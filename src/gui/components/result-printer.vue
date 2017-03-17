<template>
    <div v-if="result.courses">
        <div class="row">
            <div class="col-md-12">
                <h2>Resultat</h2>

                <label for="printWaitingList">Wartelisten anzeigen</label>
                <input type="checkbox" v-model="printWaitingList">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <ul>
                    <li v-for="course in result.courses">
                        <h3>{{course.name}}</h3>
                        <table>
                            <tbody>
                                <tr v-for="student in course.students">
                                    <td>{{student.firstName}}</td>
                                    <td>{{student.name}}</td>
                                    <td>{{student.class}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <template v-if="printWaitingList">
                            <h4>Warteliste</h4>
                            <table>
                                <thead>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>Priorität</th>
                                </thead>
                                <tbody>
                                    <tr v-for="slot in course.waitingList">
                                        <td>{{slot.student.firstName}}</td>
                                        <td>{{slot.student.name}}</td>
                                        <td>{{slot.student.class}}</td>
                                        <td>{{slot.priority}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </template>
                    </li>
                </ul>
            </div>
            <div class="col-md-6">
                <h3>Nicht-zuweisbare Teilnehmer</h3>
                <table>
                    <thead>
                        <th/>
                        <th/>
                        <th/>
                        <th v-for="priority in numberOfPriorities(result.students)">Priorität {{priority}}</th>
                    </thead>
                    <tbody>
                        <tr v-for="participant in findUnmatched(result.students)">
                            <td>{{participant.firstName}}</td>
                            <td>{{participant.name}}</td>
                            <td>{{participant.class}}</td>
                            <td v-for="priority in participant.priorities">{{priority}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as _ from 'lodash'

    export default {
        props: ['result'],
        data() {
            return {
                printWaitingList: false
            }
        },
        methods: {
            findUnmatched(participants) {
                return _.filter(participants, participant => !participant.matched)
            },
            numberOfPriorities(participants) {
                return _.range(1, participants[0].priorities.length + 1)
            }
        }
    }

</script>

<style scoped>
    table tr td, th {
        padding: .3em
    }
</style>