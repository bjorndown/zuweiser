import Vue from 'vue'
import Zuweiser from './zuweiser.vue'

Vue.config.productionTip = false

new Vue({
    render: (h) => h(Zuweiser)
}).$mount('#app')
