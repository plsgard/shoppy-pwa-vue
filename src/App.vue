<template>
  <v-app>
    <!-- <v-navigation-drawer
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
    </v-navigation-drawer> -->
    <!-- <v-toolbar
      app
      :clipped-left="clipped"
      fixed
    >
      <v-toolbar-side-icon v-show="isAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar> -->
      <router-view/>
    <v-footer fixed app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
