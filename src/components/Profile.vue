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
import apiService from '@/api/api.service.js'
export default {
  data () {
    return {
      profile: {}
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({name: 'Login'})
      })
    }
  },
  created () {
    apiService.getProfile().then((profile) => {
      this.profile = profile
    })
  }
}
</script>
