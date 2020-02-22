<template>
    <span class="explanation" :title="text">?</span>
</template>

<script lang="ts">
export default {
    props: ['text']
}
</script>

<style scoped>
.explanation {
    background: #add396;
    padding: 0 5px;
    font-weight: bold;
    border-radius: 50%;
}
</style>
