<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <select @input="onSelected">
            <option>Bitte auswählen</option>
            <option
                v-for="selectableValue in values"
                :selected="shouldBePreselected(selectableValue)"
                >{{ selectableValue }}</option
            >
        </select>
    </div>
</template>

<script>
export default {
    props: ['values', 'value', 'label'],
    methods: {
        onSelected(event) {
            this.$emit('input', event.target.value)
            this.isPristine = false
        },
        shouldBePreselected(value) {
            if (!this.label || !this.isPristine) {
                return false
            }
            const normalizedLabel = this.label.trim().toLowerCase()
            const normalizedValue = value.trim().toLowerCase()

            return normalizedValue.startsWith(normalizedLabel)
        }
    },
    data() {
        return {
            isPristine: true
        }
    }
}
</script>
