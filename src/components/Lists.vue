<template>
  <v-container fluid>
    <app-nav :drawer="drawer"></app-nav>
    <v-toolbar
      app
      clipped-left
      fixed
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Shopping lists</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :to="{ name: 'NewList' }">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content class="pt-5">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card v-if="lists.length">
            <v-list>
              <v-list-tile v-for="list in lists" :key="list.id">
                <v-list-tile-content>
                  <v-list-tile-title v-text="list.name"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-menu bottom left>
                    <v-btn icon slot="activator">
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile @click="renameList(list.name, list.id)">
                        <v-list-tile-title>Rename</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="deleteList(list.id)">
                        <v-list-tile-title>Delete</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
          <v-card v-else>
            <v-card-text>
            Create your first list using the "+" button in the top right corner.
            </v-card-text>
          </v-card>
          <v-dialog v-model="rename" persistent max-width="290" @keydown.esc="cancelRename">
            <v-card>
              <v-card-title class="headline">Rename list</v-card-title>
              <v-card-text>
                <v-form v-model="updateValid" v-on:submit.prevent ref="form" lazy-validation>
                    <v-text-field
                      label="Name"
                      v-model.lazy.trim="updateList.name"
                      :counter="50"
                      :rules="nameRules"
                      required
                      @keyup.enter="saveRename"
                      autofocus
                    ></v-text-field>
                  </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="cancelRename">Cancel</v-btn>
                <v-btn color="primary" flat @click.native="saveRename">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-content>
  </v-container>
</template>
<script>
import apiService from '@/api/api.service.js'
import { mapGetters } from 'vuex'
import Navigation from '@/components/Navigation'
const fetchInitialData = (store) => {
  return store.dispatch('listsModule/getLists')
}
export default {
  asyncData (store) {
    return fetchInitialData(store)
  },
  data () {
    return {
      drawer: false,
      updateValid: false,
      rename: false,
      updateList: {},
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ]
    }
  },
  computed: {
    ...mapGetters('listsModule', ['lists'])
  },
  methods: {
    loadLists () {
      fetchInitialData(this.$store)
    },
    renameList (name, id) {
      this.updateList = {
        id: id,
        name: name
      }
      this.rename = true
    },
    deleteList (id) {
      this.$root.$confirm.open('Delete the list', 'Are you sure? This list and all related items will be deleted.', { color: 'red' }).then((confirm) => {
        if (confirm) {
          apiService.deleteList(id).then(() => {
            this.$store.dispatch('listsModule/getLists')
          })
        }
      })
    },
    cancelRename () {
      this.$refs.form.reset()
      this.rename = false
      this.updateList = {}
      this.updateValid = false
    },
    saveRename () {
      if (this.$refs.form.validate()) {
        apiService.renameList(this.updateList).then(() => {
          this.$store.dispatch('listsModule/getLists')
          this.cancelRename()
        })
      }
    }
  },
  created () {
    this.loadLists()
  },
  components: {
    'app-nav': Navigation
  }
}
</script>
