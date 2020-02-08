<template>
    <div id="results-root" v-if="result.courses">
        <div id="results-config">
            <h2>Resultat</h2>
            <label for="printShadows">Schattenteilnehmer anzeigen</label>
            <input id="printShadows" type="checkbox" v-model="printShadows" />
        </div>
        <div id="results-successful">
            <ul>
                <li v-for="course in result.courses">
                    <h3>{{ course.name }}</h3>
                    <table>
                        <thead>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Priorität</th>
                        </thead>
                        <tbody>
                            <tr v-for="student in course.students">
                                <td>{{ student.firstName }}</td>
                                <td>{{ student.name }}</td>
                                <td>{{ student.class }}</td>
                                <td class="priority-column">
                                    {{
                                        student.priorities.indexOf(course.id) +
                                            1
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <template v-if="printShadows">
                        <h4>Schattenteilnehmer</h4>
                        <table>
                            <thead>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Priorität</th>
                                <th>Grund</th>
                            </thead>
                            <tbody>
                                <tr v-for="shadow in course.shadows">
                                    <td>{{ shadow.student.firstName }}</td>
                                    <td>{{ shadow.student.name }}</td>
                                    <td>{{ shadow.student.class }}</td>
                                    <td>{{ shadow.priority }}</td>
                                    <td>{{ getReason(shadow) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </li>
            </ul>
        </div>
        <div id="results-unassignable">
            <h3>Nicht-zuweisbare Teilnehmer</h3>
            <table>
                <thead>
                    <th />
                    <th />
                    <th />
                    <th v-for="priority in numberOfPriorities(result.students)">
                        Priorität {{ priority }}
                    </th>
                </thead>
                <tbody>
                    <tr v-for="participant in findUnmatched(result.students)">
                        <td>{{ participant.firstName }}</td>
                        <td>{{ participant.name }}</td>
                        <td>{{ participant.class }}</td>
                        <td
                            class="priority-column"
                            v-for="priority in participant.priorities"
                        >
                            {{ priority }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import range from 'lodash/range'

export default {
    props: ['result'],
    data() {
        return {
            printShadows: false
        }
    },
    methods: {
        findUnmatched(participants) {
            return participants.filter((participant) => !participant.matched)
        },
        numberOfPriorities(participants) {
            return range(1, participants[0].priorities.length + 1)
        },
        getReason(shadow) {
            const reasons = []
            if (shadow.wasAlreadyMatched) {
                reasons.push('Bereits zugewiesen')
            } else if (shadow.wasCourseFull) {
                reasons.push('Aktivität voll')
            }
            return reasons.join(', ')
        }
    }
}
</script>

<style scoped>
table {
    border-spacing: 0;
}
table tr td,
th {
    padding: 0.3em;
}

table tr:nth-of-type(odd) {
    background-color: #ccc;
}

.priority-column {
    text-align: right;
}

ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

#results-root {
    display: grid;
    grid-template-areas:
        'config config'
        'successful  unassignable';
}

#results-config {
    grid-area: config;
}

#results-successful {
    grid-area: successful;
}
#results-unassignable {
    grid-area: unassignable;
}
</style>
