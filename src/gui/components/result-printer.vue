<template>
    <div v-if="result.courses">
        <h2>Resultat</h2>

        <label for="printWaitingList">Wartelisten anzeigen</label>
        <input type="checkbox" v-model="printWaitingList">

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
</template>

<script>
    export default {
        props: ['result'],
        data() {
            return {
                printWaitingList: false
            }
        }
    }

</script>

<style scoped>
    table tr td {
        padding: .2em
    }
</style>