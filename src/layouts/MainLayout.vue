<template>
  <q-layout view="lHr LpR fFf">

    <q-header
      bordered
      class="bg-dark text-white header-height"
      height-hint="50"
    >
      <q-toolbar
        class="q-pa-none header-height"
      >
        <q-btn
          dense
          flat
          @click="toggleLeftDrawer"
          class="header-height"
        >
          <q-icon
            :name="toggleLeftDrawerIcon"
            class="q-px-xs"
          />
        </q-btn>

        <q-toolbar-title
          class="q-px-xs"
        >
          Room Name
        </q-toolbar-title>

        <q-btn
          flat
          icon="mdi-gavel"
          class="header-height"
        />

        <q-btn
          flat
          icon="mdi-image-multiple"
          class="header-height"
        />

        <q-btn
          flat
          icon="mdi-pin"
          class="header-height"
        />

        <q-btn
          flat
          icon="mdi-account-group"
          class="header-height"
        />

        <q-btn
          dense
          flat
          @click="toggleRightDrawer"
          class="header-height"
        >
          <q-icon
            :name="toggleRightDrawerIcon"
            class="q-px-xs mirror-horizontal"
          />
        </q-btn>
      </q-toolbar>


    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
      class="q-pa-sm"
    >
      <span class="text-h5">Server Info</span>
      <hr/>
      <span class="text-h5">Optional Space Info</span>
      <hr/>
      <span class="text-h5">Rooms List</span>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      side="right"
      bordered
      class="q-pa-sm"
    >
      <span class="text-h5">Your Account</span>
      <hr/>
      <span class="text-h5">Shortcuts</span>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      bordered
      class="bg-dark text-white footer-height"
    >
      <q-toolbar
        class="q-py-none footer-height"
      >
        <span>Status Bar</span>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const leftDrawerOpen = ref<boolean>(false);
const rightDrawerOpen = ref<boolean>(false);

// I prefer the look of the icons switched fron how they are named
const toggleLeftDrawerIcon = computed<string>(() =>
  leftDrawerOpen.value
    ? 'mdi-menu-open'
    : 'mdi-menu-close');

const toggleRightDrawerIcon = computed<string>(() =>
  rightDrawerOpen.value
    ? 'mdi-menu-open'
    : 'mdi-menu-close');

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>

<style lang="scss">
.header-height {
  min-height: 50px;
  height: 50px;
}

.footer-height {
  min-height: 30px;
  height: 30px;
}

</style>
