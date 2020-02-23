<template>
    <svg
        viewBox="0 0 400 250"
        width="400"
        height="250"
        xmlns="http://www.w3.org/2000/svg"
        class="chart"
        role="img"
    >
        <g class="bar" v-for="(value, key, index) in data">
            <text dy="15" x="0" :y="yOffset + index * barGap">{{ key }}</text>
            <text dy="15" :x="value + 90" :y="yOffset + index * barGap">
                {{ value }}
            </text>
            <rect
                x="80"
                :y="yOffset + index * barGap"
                :width="value"
                height="20"
            ></rect>
        </g>
    </svg>
</template>

<script>
export default {
    name: 'BarChart',
    props: ['data'],
    data() {
        return {
            yOffset: 0,
            barGap: 40
        }
    }
}
</script>

<style scoped>
.bar rect {
    fill: #dddddd;
}
.bar text {
    color: black;
}
</style>
