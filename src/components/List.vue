<template>
<v-container fluid>
    <app-nav ref="navBar"></app-nav>
    <v-toolbar
      app
      clipped-left
      dark color="secondary"
    >
      <v-toolbar-side-icon @click.stop="$refs.navBar.toggleDrawer()"></v-toolbar-side-icon>
      <v-toolbar-title v-text="list.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn id="createItemBtn" flat large @click.stop="create" v-show="formEnable" :disabled="this.name === ''">
        OK
      </v-btn>
    </v-toolbar>
    <v-content class="pt-5">
      <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-list>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>add</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-form v-model="valid" v-on:submit.prevent ref="form" style="width: 100%">
                      <v-text-field
                        label="Add an item"
                        v-model.lazy.trim="name"
                        single-line
                        @keyup.enter="create"
                        @focus="formEnable = true"
                        @blur="unblur"
                        autofocus
                        solo
                        flat
                        ref="newItem"
                      ></v-text-field>
                    </v-form>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="items.length"></v-divider>
                <transition-group name="slide-x-transition">
                <v-list-tile v-for="(item,index) in items" v-if="!item.picked" :key="item.id" v-touch="{
      left: () => deleteItem(item.id)
    }">
                  <v-list-tile-action>
                    <v-checkbox v-model="item.picked" @click="pickItem(item.id, !item.picked)"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <!-- <v-list-tile-title v-text="item.name"></v-list-tile-title> -->
                    <v-form v-on:submit.prevent ref="updateForm" style="width: 100%">
                      <v-text-field
                        :value="item.name"
                        single-line
                        solo
                        flat
                        @change="update(item.id, $event, $refs.updateForm[index])"
                      ></v-text-field>
                    </v-form>
                  </v-list-tile-content>
                  <v-list-tile-action class="delete" @click="deleteItem(item.id)">
                    <v-icon>delete</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                </transition-group>
                <v-list-group
            v-if="pickedItems.length"
            no-action
            prepend-icon="shopping_basket"
            class="grey--text text--darken-1"
          >
          <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ pickedItems.length > 0 && pickedItems.length !== items.length ? pickedItems.length : 'All' }} picked {{ pickedItems.length > 1 ? 'items' : 'item' }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          <v-list-tile v-for="item in pickedItems" v-if="item.picked" :key="item.id" href="javascript:;">
                  <v-list-tile-action>
                    <v-checkbox v-model="item.picked" @click="pickItem(item.id, !item.picked)"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content @click="pickItem(item.id, !item.picked)">
                    <v-list-tile-title v-text="item.name"></v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="delete" @click="deleteItem(item.id)">
                    <v-icon>delete</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                </v-list-group>
              </v-list>
            </v-card>
          </v-flex>
      </v-layout>
    </v-content>
</v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
      error: false,
      errorMessage: '',
      name: '',
      valid: false,
      formEnable: false,
      list: {}
    }
  },
  asyncData (store, route) {
    return fetchInitialData(store, route)
  },
  computed: {
    ...mapGetters('itemsModule', ['items']),
    ...mapGetters('listsModule', ['lists']),
    listId: function () {
      return this.$route.params.id
    },
    pickedItems: function () {
      return this.items.filter(function (el) {
        return el.picked
      })
    }
  },
  methods: {
    ...mapActions('itemsModule', {
      delete: 'deleteItem',
      rename: 'renameItem',
      createNew: 'createItem',
      pick: 'pickItem'
    }),
    loadList () {
      fetchInitialList(this.$store).then(() => {
        this.list = this.lists.find((el) => {
          return el.id === this.listId
        })
      })
    },
    loadItems () {
      fetchInitialData(this.$store, this.$route).catch(() => this.$root.$error.displayDefaultError())
    },
    create () {
      if (this.$refs.form.validate() && this.name !== '') {
        if (this.name.length > 100) {
          this.valid = false
          this.$root.$error.displayError('Item name must be less than 100 characters')
        } else {
          this.valid = true
          this.createNew({ listId: this.listId, name: this.name }).then(() => {
            this.loadItems()
            this.initForm()
          }).catch(() => this.$root.$error.displayDefaultError())
        }
      }
    },
    update (id, updateName, form) {
      if (form.validate() && updateName !== '' && updateName.trim() !== '') {
        updateName = updateName.trim()
        if (updateName.length > 100) {
          form.valid = false
          this.$root.$error.displayError('Item name must be less than 100 characters')
        } else {
          form.valid = true
          this.rename({id, updateName}).then(() => {
            this.loadItems()
          }).catch(() => this.$root.$error.displayDefaultError())
        }
      } else {
        form.valid = false
      }
    },
    deleteItem (id) {
      this.delete(id).then(() => {
        this.loadItems()
        this.initForm()
      }).catch(() => { this.$root.$error.displayDefaultError() })
    },
    unblur (event) {
      if (event.relatedTarget === null || event.relatedTarget.id !== 'createItemBtn') {
        this.formEnable = false
      }
    },
    initForm () {
      this.$refs.form.reset()
      this.valid = true
      this.name = ''
      this.$refs.newItem.$el.focus()
      this.$refs.newItem.$el.blur()
    },
    pickItem (id, toPick) {
      this.pick({id, toPick}).then(() => {
        this.loadItems()
        this.initForm()
      }).catch(() => this.$root.$error.displayDefaultError())
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadList()
      this.loadItems()
      this.initForm()
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
.input-group.input-group--solo >>> label, .input-group.input-group--solo >>> .input-group__input {
  padding-left: 0;
}
</style>
