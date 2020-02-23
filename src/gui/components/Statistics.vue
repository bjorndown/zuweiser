<template>
    <div id="statistics-root">
        <div id="statistics-overview">
            <h3>Zusammenfassung</h3>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Zugewiesen</th>
                        <th>Minimum</th>
                        <th>Limit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in result.courses">
                        <td>{{ course.name }}</td>
                        <td class="number">{{ course.students.length }}</td>
                        <td class="number">{{ course.minimum }}</td>
                        <td class="number">{{ course.limit }}</td>
                    </tr>
                    <tr class="totals">
                        <td>Total</td>
                        <td class="number">
                            {{
                                result.students.filter(
                                    (student) => student.matched
                                ).length
                            }}
                        </td>
                        <td class="number">
                            {{
                                result.courses
                                    .map((course) => course.minimum)
                                    .reduce(
                                        (partialSum, minimum) =>
                                            partialSum + minimum
                                    )
                            }}
                        </td>
                        <td class="number">
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
                </tbody>
            </table>
        </div>
        <div id="statistics-barchart">
            <h3>Verteilung der erf&uuml;llten Priorit&auml;ten</h3>
            <BarChart :data="computePriorityDistribution(result)" />
        </div>
    </div>
</template>
<script>
import BarChart from '@/gui/components/BarChart'

const getXLabel = (priority) => `${priority + 1}. Priorität`

export default {
    components: { BarChart },
    name: 'Statistics',
    props: ['result'],
    methods: {
        computePriorityDistribution(results) {
            const distribution = {}
            for (const course of results.courses) {
                for (const student of course.students) {
                    const fullfilledPriority = student.priorities.indexOf(
                        course.id
                    )
                    if (!distribution[getXLabel(fullfilledPriority)]) {
                        distribution[getXLabel(fullfilledPriority)] = 1
                    } else {
                        distribution[getXLabel(fullfilledPriority)]++
                    }
                }
            }
            console.log(distribution)
            return distribution
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

tr.totals {
    font-weight: bold;
}

table tr td,
th {
    padding: 0.3em;
}

td.number {
    text-align: center;
}

table tbody tr:nth-of-type(even) {
    background-color: #ddd;
}

ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

#statistics-root {
    display: grid;
    grid-column-gap: 20px;
    grid-template-areas: 'overview barchart';
}

#statistics-overview {
    grid-area: overview;
}

#statistics-barchart {
    grid-area: barchart;
}
</style>
