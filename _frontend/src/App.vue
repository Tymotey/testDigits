<script setup>
import ComponentHeader from './components/pageParts/ComponentHeader.vue';
import ComponentLeft from './components/pageParts/ComponentLeft.vue';
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <ComponentHeader />
    <ComponentLeft />
    <q-page-container style="height: 100vh;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss"></style>
