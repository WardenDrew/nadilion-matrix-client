<script setup lang="ts">
import { useHomeserverStore } from "stores/HomeserverStore";
const homeserver = useHomeserverStore();

</script>

<template>
  <q-page padding>

    <q-card flat bordered class="q-mb-md">
      <q-img
        :src="homeserver.overviewBanner"
        :ratio="4/1"
        width="100%"
      />
    </q-card>

    <q-card flat bordered>
      <q-card-section>
        <h4 class="text-center">{{ homeserver.displayName }}</h4>
        <p
          v-for="(text, idx) in homeserver.overview"
          :key="idx"
          class="q-mt-sm"
        >
          {{ text }}
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped lang="scss">
</style>
