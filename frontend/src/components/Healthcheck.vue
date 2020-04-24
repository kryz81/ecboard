<template>
  <div class="_margin-bottom-2">
    <i-badge :variant="healthcheck.mongodb ? 'success' : 'danger'">MongoDB</i-badge>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getHealthcheck } from '@/services/healthcheck';

@Component
export default class Healthcheck extends Vue {
  healthcheck = {};

  async mounted() {
    const result = await getHealthcheck();
    if (result.status === 200) {
      this.healthcheck = result.data;
    } else {
      alert('Error reading healthcheck');
    }
  }
}
</script>
