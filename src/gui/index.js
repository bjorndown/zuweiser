import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import zuweiser from './components/zuweiser.vue'

new Vue({
    el: '#app',
    components: {
        'zuweiser': zuweiser,
    }
})