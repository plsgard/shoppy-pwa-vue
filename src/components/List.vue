<template>
<v-container fluid>
    <app-nav :drawer="drawer"></app-nav>
    <v-toolbar
      app
      clipped-left
      fixed
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="list.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn id="createItemBtn" flat large @click="create()" v-show="formEnable" :disabled="!valid">
        OK
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-list two-line>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>add</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content xs12>
                    <v-form v-model="valid" v-on:submit.prevent ref="form" style="width: 100%">
                      <v-text-field
                        label="Add an item"
                        v-model.lazy.trim="name"
                        :counter="50"
                        :rules="nameRules"
                        required
                        @keyup.enter="create"
                        @focus="formEnable = true"
                        @blur="unblur"
                        autofocus
                      ></v-text-field>
                    </v-form>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.id">
                  <v-list-tile-action>
                    <v-checkbox></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="item.name"></v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="delete" @click="deleteItem(item.id)">
                    <v-icon>delete</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
      </v-layout>
    </v-content>
</v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import apiService from '@/api/api.service.js'
import Navigation from '@/components/Navigation'
const fetchInitialData = (store, route) => {
  return store.dispatch('itemsModule/getListItems', route.params.id)
}
const fetchInitialList = (store) => {
  return store.dispatch('listsModule/getLists')
}
export default {
  data () {
    return {
      drawer: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],
      valid: false,
      formEnable: false,
      listId: this.$route.params.id,
      list: {}
    }
  },
  asyncData (store, route) {
    return fetchInitialData(store, route)
  },
  computed: {
    ...mapGetters('itemsModule', ['items']),
    ...mapGetters('listsModule', ['lists'])
  },
  methods: {
    loadList () {
      fetchInitialList(this.$store).then(() => {
        this.list = this.lists.find((el) => {
          return el.id === this.listId
        })
      })
    },
    loadItems () {
      fetchInitialData(this.$store, this.$route)
    },
    create () {
      if (this.$refs.form.validate()) {
        apiService.createItem({ listId: this.listId, name: this.name }).then(() => {
          this.loadItems()
          this.$refs.form.reset()
        })
      }
    },
    deleteItem (id) {
      apiService.deleteItem(id).then(() => {
        this.loadItems()
        this.$refs.form.reset()
      })
    },
    unblur (event) {
      if (event.relatedTarget === null || event.relatedTarget.id !== 'createItemBtn') {
        this.formEnable = false
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.listId = this.$route.params.id
      this.loadList()
      this.loadItems()
      this.$refs.form.reset()
    }
  },
  created () {
    this.loadList()
    this.loadItems()
  },
  components: {
    'app-nav': Navigation
  }
}
</script>
<style scoped>
.list__tile > .list__tile__action.delete > .icon {
  display: none;
}
.list__tile:hover > .list__tile__action.delete > .icon {
  display: inline-flex;
  cursor: pointer;
}
</style>
