<template>
    <Zuweiser></Zuweiser>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Zuweiser from './components/zuweiser.vue'

@Component({
  components: {
    Zuweiser
  },
})
export default class App extends Vue {}
</script>
