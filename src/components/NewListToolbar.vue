<template>
  <app-toolbar :title="title">
    <v-toolbar-side-icon slot="left-actions" v-show="isAuthenticated"></v-toolbar-side-icon>
    <!-- <v-toolbar-side-icon slot="left-actions" v-show="isAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
  </app-toolbar>
</template>
<script>
import { mapGetters } from 'vuex'
import Toolbar from '@/components/Toolbar'
export default {
  data () {
    return {
      title: 'New list'
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  components: {
    'app-toolbar': Toolbar
  }
}
</script>
