<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12 class="mb-1">
    <v-avatar class="indigo mb-2">
        <v-icon dark>account_circle</v-icon>
    </v-avatar>
    <h4>{{ profile.firstName }} {{ profile.lastName }}</h4>
    <span class="grey--text text--darken-1">{{ profile.email }}</span>
    </v-flex>
    <v-flex xs12>
    <v-btn class="mx-0 mb-0 btn--active" @click="logout()" flat small color="primary">logout</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
import { mapGetters } from 'vuex'
const fetchInitialData = (store) => {
  return store.dispatch('profileModule/getProfile')
}
export default {
  asyncData (store) {
    return fetchInitialData(store)
  },
  computed: {
    ...mapGetters('profileModule', ['profile'])
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    loadProfile () {
      fetchInitialData(this.$store)
    }
  },
  created () {
    this.loadProfile()
  }
}
</script>
