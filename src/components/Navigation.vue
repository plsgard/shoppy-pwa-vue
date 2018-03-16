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
      <v-container>
        <v-layout row wrap>
          <v-flex xs6><h4>All lists</h4></v-flex>
          <v-flex xs6><v-btn flat small :to="{ name: 'Lists' }">Manage</v-btn></v-flex>
        </v-layout>
      </v-container>
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
