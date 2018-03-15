<template>
  <v-list>
    <v-list-tile v-for="list in lists" :key="list.id" :to="{ name: 'lists', params: { id: list.id } }">
      <v-list-tile-action>
        <v-icon>list</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="list.title"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/lists/new">
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
export default {
  data () {
    return {
      lists: [
        {
          id: 1,
          title: 'Liste PL'
        },
        {
          id: 2,
          title: 'Liste Marine'
        }
      ]
    }
  }
}
</script>
