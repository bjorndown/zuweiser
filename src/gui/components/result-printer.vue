<template>
    <div>
        <h2 v-if="result.courses">Resultat</h2>
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
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            result: { courses: [] }
        }
    }
}

</script>