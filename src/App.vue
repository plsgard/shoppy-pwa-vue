<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <user-profile v-if="isAuthenticated"></user-profile>
      <v-divider></v-divider>
      <nav-list v-if="isAuthenticated"></nav-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon v-show="isAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import NavLists from '@/components/NavLists'
import Profile from '@/components/Profile'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'title'])
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false
    }
  },
  components: {
    'nav-list': NavLists,
    'user-profile': Profile
  },
  name: 'App'
}
</script>
