<template>
  <v-list>
    <v-list-tile v-for="list in lists" :key="list.id" :to="{ name: 'List', params: { id: list.id, listName: list.name } }">
      <v-list-tile-action>
        <v-icon>list</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="list.name"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="{ name: 'NewList' }">
      <v-list-tile-action>
        <v-icon>add</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>NEW LIST</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
<script>
import { mapGetters } from 'vuex'
const fetchInitialData = (store) => {
  return store.dispatch('listsModule/getLists')
}
export default {
  asyncData (store) {
    return fetchInitialData(store)
  },
  computed: {
    ...mapGetters('listsModule', ['lists'])
  },
  methods: {
    loadLists () {
      fetchInitialData(this.$store)
    }
  },
  created () {
    this.loadLists()
  }
}
</script>
