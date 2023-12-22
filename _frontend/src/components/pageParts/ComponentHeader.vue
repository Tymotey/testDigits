<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="fa-solid fa-bars" @click="toggleDrawer" />
      <q-toolbar-title>
        <q-img src="/logo.png" style="height: 50px; width: auto;" spinner-color="white" />
        11 Digits - Timotei
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('drawer', [
      'toggleDrawer'
    ])
  },
}
</script>

<style scoped lang="scss"></style>
