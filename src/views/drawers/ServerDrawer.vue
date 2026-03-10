<script setup lang="ts">
import { useHomeserverStore } from "stores/HomeserverStore";
const homeserver = useHomeserverStore();

</script>

<template>
  <q-img
    class="server-banner"
    :src="homeserver.banner"
    :ratio="4/1"
    width="100%"
  />
  <q-btn flat dense no-caps class="full-width">
    <h6 class="full-width text-left q-px-xs">{{homeserver.displayName}}</h6>
  </q-btn>
  <hr/>
  <q-tabs dense>
    <q-tab icon="mdi-plus-box"/>
    <q-tab icon="mdi-magnify"/>
    <q-tab icon="mdi-gavel"/>
    <q-tab icon="mdi-wan"/>
  </q-tabs>
  <hr/>
  <div class="q-pa-sm">
    <div class="row items-center">
      <q-icon name="mdi-message-text" class="q-mr-sm"/>
      <span>Public Rooms</span>
    </div>
  </div>
  <hr/>
  <div class="q-pa-sm">
    <div class="row items-center">
      <q-icon name="mdi-message-text-lock-outline" class="q-mr-sm"/>
      <span>Your Private Rooms</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
