<template>
  <v-container fluid>
    <app-nav :drawer="drawer"></app-nav>
    <v-toolbar
      app
      clipped-left
      fixed
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Shoppy</v-toolbar-title>
    </v-toolbar>
  <login></login>
  </v-container>
</template>
<script>
import Login from '@/components/Login'
import Navigation from '@/components/Navigation'
export default {
  data () {
    return {
      drawer: false
    }
  },
  components: {
    'login': Login,
    'app-nav': Navigation
  }
}
</script>
