<template>
  <q-layout view="hHh lpR fFf">
    <ComponentHeader />
    <ComponentLeft />
    <q-page-container style="height: 100vh;">
      <Suspense>
        <router-view />
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ComponentHeader from './components/pageParts/ComponentHeader.vue';
import ComponentLeft from './components/pageParts/ComponentLeft.vue';
</script>

<script>
import { computed, reactive } from 'vue'

const projects = reactive([])

export default {
  provide() {
    return {
      projects: computed(() => { return projects })
    }
  }
}
</script>

<style scoped lang="scss"></style>
