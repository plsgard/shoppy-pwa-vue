<template>
<v-container>
  <v-layout row wrap>
    <v-flex xs12>
    <v-avatar class="indigo">
        <v-icon dark>account_circle</v-icon>
    </v-avatar>
    <h3>{{ profile.firstName }} {{ profile.lastName }}</h3>
    <a href="#">{{ profile.email }}</a>
    <v-spacer></v-spacer>
    <v-btn @click="logout()" small>logout</v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
import apiService from '@/api/api.service.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      profile: {}
    }
  },
  methods: {
    ...mapActions(['logout'])
  },
  created () {
    apiService.getProfile().then((profile) => {
      this.profile = profile
    })
  }
}
</script>
