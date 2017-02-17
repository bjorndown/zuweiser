export var multiselect = {
    props: ['config-item', 'values', 'value', 'label'],
    template: `<div>
        <label>{{label}}</label>
        <select @input="onSelected">
        <option>Bitte auswaehlen</option>
        <option v-for="selectableValue in values">{{selectableValue}}</option>
        </select>
        </div>`,
    methods: {
        onSelected: function (event) {
            this.$emit('input', event.target.value)
        }
    }
}