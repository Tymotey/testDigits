<template>
  <q-drawer v-model="drawerStatus" side="left" overlay elevated>
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">
        <q-item clickable v-ripple to="/" @click="goToLink">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-house"></q-icon>
          </q-item-section>
          <q-item-section>
            Homepage
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple v-if="userLogged === false" to="/user/login" @click="goToLink">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-user"></q-icon>
          </q-item-section>
          <q-item-section>
            Login
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple v-if="userLogged === true" to="/user/myProfile" @click="goToLink">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-right-from-bracket"></q-icon>
          </q-item-section>
          <q-item-section>
            My profile
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple v-if="userLogged === true" to="/user/logout" @click="goToLink">
          <q-item-section avatar>
            <q-icon name="fa-solid fa-right-from-bracket"></q-icon>
          </q-item-section>
          <q-item-section>
            Logout
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    drawerStatus: state => state.drawer.drawerStatus,
    userLogged: state => state.user.userLogged
  }),
  methods: {
    ...mapActions('drawer', [
      'openDrawer',
      'closeDrawer',
    ]),
    goToLink(e, go) {
      e.preventDefault();
      this.$store.dispatch('drawer/closeDrawer');
      go();
    }
  }
}
</script>

<style scoped lang="scss"></style>
