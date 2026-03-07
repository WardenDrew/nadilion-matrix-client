<template>
  <q-page class="row items-center justify-evenly">
    <h1>Room Content</h1>
  </q-page>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import {ServerName} from "src/matrix/models/ServerName";
import {AutoDiscovery} from "src/matrix/discovery/AutoDiscovery";

onMounted(async () => {
  const serverName = ServerName.parse("nadilion.com");
  const autoDiscovery = new AutoDiscovery(serverName);
  const baseUrl = await autoDiscovery.discover();
  console.log(baseUrl);
})
</script>
