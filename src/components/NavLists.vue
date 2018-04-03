<template>
  <v-list subheader>
    <v-subheader><v-flex xs6><h4>All lists</h4></v-flex>
          <v-flex xs6 class="text-xs-right"><v-btn class="mx-0" flat small color="primary" :to="{ name: 'Lists' }" exact>Manage</v-btn></v-flex></v-subheader>
    <v-list-tile v-for="list in lists" :key="list.id" :to="{ name: 'List', params: { id: list.id } }">
      <v-list-tile-action>
        <v-icon>list</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="list.name"></v-list-tile-title>
        <v-list-tile-sub-title v-if="list.userId != profile.id">shared by {{ list.user.firstName }} {{ list.user.lastName }}</v-list-tile-sub-title>
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
    ...mapGetters('listsModule', ['lists']),
    ...mapGetters('profileModule', ['profile'])
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
