<template>
    <div id="results-root" v-if="result.courses">
        <div id="results-config">
            <h2>Resultat</h2>
        </div>
        <div id="results-stats-left">
            <table>
                <tbody>
                    <tr>
                        <td>Total Teilnehmer</td>
                        <td>{{ result.students.length }}</td>
                    </tr>
                    <tr>
                        <td>Total Pl&auml;tze</td>
                        <td>
                            {{
                                result.courses
                                    .map((course) => course.limit)
                                    .reduce(
                                        (partialSum, limit) =>
                                            partialSum + limit
                                    )
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td>Total vergebene Plätze</td>
                        <td>
                            {{
                                result.students.filter(
                                    (student) => student.matched
                                ).length
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="results-stats-right">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Belegung</th>
                        <th>Minimum</th>
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in result.courses">
                        <td>{{ course.name }}</td>
                        <td>{{ course.students.length }}</td>
                        <td>{{ course.minimum }}</td>
                        <td>{{ course.limit }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="results-successful">
            <ul>
                <li v-for="course in result.courses">
                    <h3>{{ buildActivityResultHeader(course) }}</h3>
                    <table>
                        <thead>
                            <th>#</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Priorität</th>
                        </thead>
                        <tbody>
                            <tr v-for="(student, index) in course.students">
                                <td>{{ index + 1 }}</td>
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
                </li>
            </ul>
        </div>
        <div id="results-unassignable">
            <h3>Nicht-zuweisbare Teilnehmer</h3>
            <template v-if="findUnmatched(result.students).length > 0">
                <table>
                    <thead>
                        <th>#</th>
                        <th />
                        <th />
                        <th />
                        <th
                            v-for="priority in numberOfPriorities(
                                result.students
                            )"
                        >
                            Priorität {{ priority }}
                        </th>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(participant, index) in findUnmatched(
                                result.students
                            )"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>{{ participant.firstName }}</td>
                            <td>{{ participant.name }}</td>
                            <td>{{ participant.class }}</td>
                            <td v-for="priority in participant.priorities">
                                {{
                                    buildActivityResultHeader(
                                        result.courses.find(
                                            (course) => course.id === priority
                                        )
                                    )
                                }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
            <p v-else>Keine.</p>
        </div>
    </div>
</template>

<script>
import range from 'lodash/range'

export default {
    props: ['result'],
    data() {
        return {}
    },
    methods: {
        findUnmatched(participants) {
            return participants.filter((participant) => !participant.matched)
        },
        numberOfPriorities(participants) {
            return range(1, participants[0].priorities.length + 1)
        },
        buildActivityResultHeader(activity) {
            return `${activity.name} (${activity.students.length} / ${activity.limit})`
        }
    }
}
</script>

<style scoped>
table {
    border-spacing: 0;
    min-width: 350px;
    max-width: 550px;
}

#results-unassignable table {
    max-width: 800px;
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
    grid-template-columns: 450px auto;
    grid-template-areas:
        'config config'
        'stats-left stats-right'
        'successful  unassignable';
}

#results-config {
    grid-area: config;
}

#results-stats-right {
    grid-area: stats-right;
}

#results-stats-left {
    grid-area: stats-left;
}

#results-successful {
    grid-area: successful;
}

#results-unassignable {
    grid-area: unassignable;
}
</style>
