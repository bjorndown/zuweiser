<template>
    <div>
        <label>{{label}}</label>
        <select @input="onSelected">
        <option>Bitte auswaehlen</option>
        <option v-for="selectableValue in values">{{selectableValue}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        props: ['config-item', 'values', 'value', 'label'],
        methods: {
            onSelected(event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>