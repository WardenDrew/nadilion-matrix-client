<template>
  <q-layout view="lHr LpR fFf">
    <q-header
      v-if="renderHeader"
      bordered
      class="bg-dark text-white header-height"
      height-hint="50"
    >
      <q-toolbar class="q-pa-none header-height justify-between items-center">
        <q-btn
          v-if="hasLeft"
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

        <div
          v-if="hasHeader"
          class="header-height flex-grow"
        >
          <router-view name="header"/>
        </div>

        <q-btn
          v-if="hasRight"
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
      v-if="hasLeft"
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      bordered
    >
      <router-view name="left"/>
    </q-drawer>

    <q-drawer
      v-if="hasRight"
      v-model="rightDrawerOpen"
      show-if-above
      side="right"
      bordered
    >
      <router-view name="right"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      v-if="hasFooter"
      bordered
      class="bg-dark text-white footer-height"
    >
      <q-toolbar
        class="q-py-none footer-height"
      >
        <router-view name="footer"/>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const hasHeader = computed(() => route.matched.some(r => r.components?.header));
const hasFooter = computed(() => route.matched.some(r => r.components?.footer));
const hasLeft = computed(() => route.matched.some(r => r.components?.left));
const hasRight = computed(() => route.matched.some(r => r.components?.right));
const renderHeader = computed(() => hasHeader.value || hasLeft.value || hasRight.value);

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
