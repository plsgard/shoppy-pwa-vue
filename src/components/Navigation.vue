<template>
  <v-navigation-drawer
      persistent
      clipped
      v-model="drawerState"
      enable-resize-watcher
      fixed
      app
      absolute
      temporary
    >
      <user-profile v-if="isAuthenticated"></user-profile>
      <v-divider></v-divider>
      <nav-list v-if="isAuthenticated"></nav-list>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
import NavLists from '@/components/NavLists'
import Profile from '@/components/Profile'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'drawer']),
    drawerState: {
      get () {
        return this.drawer
      },
      set (state) {
        this.$store.dispatch('setDrawer', state)
      }
    }
  },
  methods: {
    toggleDrawer () {
      // this.$store.dispatch('setDrawer', !this.drawer)
      this.drawerState = !this.drawerState
    }
  },
  components: {
    'nav-list': NavLists,
    'user-profile': Profile
  }
}
</script>
