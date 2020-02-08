<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <select v-model="selectedValue" @input="onSelected">
            <option>{{ initialValue }}</option>
            <option v-for="value in values">{{ value }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: ['values', 'label'],
    methods: {
        onSelected(event) {
            this.$emit('input', event.target.value)
            this.isPristine = false
        },
        preSelect() {
            if (!this.label || !this.isPristine) {
                return false
            }

            const normalizedLabel = this.label.trim().toLowerCase()

            for (const value of this.values) {
                const normalizedValue = value.trim().toLowerCase()

                if (normalizedValue.startsWith(normalizedLabel)) {
                    this.$emit('input', value)
                    this.isPristine = false
                    this.selectedValue = value
                }
            }
        }
    },
    data() {
        return {
            isPristine: true,
            selectedValue: 'Bitte auswählen',
            initialValue: 'Bitte auswählen'
        }
    },
    mounted() {
        this.preSelect()
    },
    updated() {
        this.preSelect()
    }
}
</script>
