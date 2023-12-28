<template>
  <q-layout view="hHh lpR fFf">
    <ComponentHeader />
    <ComponentLeft />
    <q-page-container style="height: 100vh;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ComponentHeader from './components/pageParts/ComponentHeader.vue';
import ComponentLeft from './components/pageParts/ComponentLeft.vue';
</script>

<script>
export default {
}
</script>

<style scoped lang="scss"></style>
