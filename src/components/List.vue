<template>
<v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list>
          <!-- <v-list-tile>
      <v-list-tile-action>
        <v-icon>add</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>NEW LIST</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile> -->
    <v-list-tile v-for="item in items" :key="item.id">
      <v-list-tile-action>
        <v-checkbox></v-checkbox>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon>delete</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
      </v-card>
    </v-flex>
</v-layout>
</template>
<script>
import { mapGetters } from 'vuex'
const fetchInitialData = (store, route) => {
  return store.dispatch('itemsModule/getListItems', route.params.id)
}
export default {
  asyncData (store, route) {
    return fetchInitialData(store, route)
  },
  computed: {
    ...mapGetters('itemsModule', ['items'])
  },
  methods: {
    loadItems () {
      fetchInitialData(this.$store, this.$route)
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadItems()
    }
  },
  created () {
    this.loadItems()
  }
}
</script>
