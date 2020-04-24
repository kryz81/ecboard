<template>
  <div>
    <healthcheck></healthcheck>
    <apps-list></apps-list>
  </div>
</template>

<script>
import AppsList from '@/components/AppsList';
import Healthcheck from '@/components/Healthcheck';

export default {
  name: 'Home',
  components: {
    AppsList,
    Healthcheck,
  },
};
</script>
