<template>
  <v-navigation-drawer
      persistent
      clipped
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
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
  props: ['drawer'],
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  components: {
    'nav-list': NavLists,
    'user-profile': Profile
  }
}
</script>
