<template>
  <i-table bordered striped>
    <thead>
      <tr>
        <th>PID</th>
        <th>Application</th>
        <th>Port</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in apps" :key="item.pid">
        <th scope="row">{{ item.pid }}</th>
        <td>{{ item.app.name }}</td>
        <td>{{ item.app.port }}</td>
        <td>
          <i-badge :variant="item.status === 'online' ? 'success' : 'danger'">{{ item.status }}</i-badge>
        </td>
        <td>
          <router-link to="/logs/bistravel.pl">
            <i-button variant="secondary" title="Logs">
              <i-icon icon="search" size="sm"></i-icon>
            </i-button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </i-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getApps } from '@/services/apps';

@Component
export default class AppsList extends Vue {
  apps = [];

  async mounted() {
    const result = await getApps();
    if (result.status === 200) {
      this.apps = result.data;
    } else {
      alert('Error reading apps');
    }
  }
}
</script>
