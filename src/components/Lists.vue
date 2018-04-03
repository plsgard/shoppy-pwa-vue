<template>
  <v-container fluid>
    <app-nav ref="navBar"></app-nav>
    <v-toolbar
      app
      clipped-left
      dark color="secondary"
    >
      <v-toolbar-side-icon @click.stop="$refs.navBar.toggleDrawer()"></v-toolbar-side-icon>
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
                <v-list-tile-content @click="goToList(list.id)">
                  <v-list-tile-title v-text="list.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-if="list.userId != profile.id">shared by {{ list.user.firstName }} {{ list.user.lastName }}</v-list-tile-sub-title>
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
                      <v-list-tile @click="duplicateList(list.id)">
                        <v-list-tile-title>Duplicate</v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="shareList(list.id)">
                        <v-list-tile-title>Share</v-list-tile-title>
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
            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
            <v-card-text v-else>
              <p class="subheading my-1"><v-icon>playlist_add</v-icon>  Create your first list using the "+" button in the top right corner.</p>
            </v-card-text>
          </v-card>
          <v-dialog v-model="renameForm" persistent max-width="290" @keydown.esc="cancelRename">
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
          <v-dialog v-model="duplicateForm" persistent max-width="290" @keydown.esc="cancelDuplicate">
            <v-card>
              <v-card-title class="headline">Duplicate list</v-card-title>
              <v-card-text>
                <v-form v-model="duplicateValid" v-on:submit.prevent ref="duplicateForm" lazy-validation>
                    <v-text-field
                      label="Name"
                      v-model.lazy.trim="duplicateObjectList.name"
                      :counter="50"
                      :rules="nameRules"
                      required
                      @keyup.enter="saveDuplicate"
                      autofocus
                    ></v-text-field>
                  </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="cancelDuplicate">Cancel</v-btn>
                <v-btn color="primary" flat @click.native="saveDuplicate">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="shareForm" persistent max-width="290" @keydown.esc="cancelShare">
            <v-card>
              <v-card-title class="headline">Share list</v-card-title>
              <v-card-text>
                <v-form v-model="shareValid" v-on:submit.prevent ref="shareForm" lazy-validation>
                    <v-text-field
                    prepend-icon="person"
                      label="E-mail"
                      v-model.lazy.trim="shareObjectList.userName"
                      :rules="emailRules"
                      required
                      @keyup.enter="saveShare"
                      autofocus
                    ></v-text-field>
                  </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="cancelShare">Cancel</v-btn>
                <v-btn color="primary" flat @click.native="saveShare">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-content>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
      loading: false,
      updateValid: false,
      renameForm: false,
      updateList: {},
      duplicateValid: false,
      duplicateForm: false,
      duplicateObjectList: {},
      shareValid: false,
      shareForm: false,
      shareObjectList: {},
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    ...mapGetters('listsModule', ['lists']),
    ...mapGetters('profileModule', ['profile'])
  },
  methods: {
    ...mapActions('listsModule', {
      delete: 'deleteList',
      rename: 'renameList',
      duplicate: 'duplicateList',
      share: 'shareList'
    }),
    goToList (id) {
      this.$router.push({name: 'List', params: {id: id}})
    },
    renameList (name, id) {
      this.updateList = {
        id: id,
        name: name
      }
      this.renameForm = true
    },
    duplicateList (id) {
      this.duplicateObjectList = {
        existingListId: id,
        name: ''
      }
      this.duplicateForm = true
    },
    shareList (id) {
      this.shareObjectList = {
        listId: id,
        userName: ''
      }
      this.shareForm = true
    },
    deleteList (id) {
      this.$root.$confirm.open('Delete the list', 'Are you sure? This list and all related items will be deleted.', { color: 'red' }).then((confirm) => {
        if (confirm) {
          this.delete(id).catch(() => this.$root.$error.displayDefaultError())
        }
      })
    },
    cancelRename () {
      this.$refs.form.reset()
      this.renameForm = false
      this.updateList = {}
      this.updateValid = false
    },
    saveRename () {
      if (this.$refs.form.validate()) {
        this.rename(this.updateList).then(() => {
          this.cancelRename()
        }).catch(() => this.$root.$error.displayDefaultError())
      }
    },
    cancelDuplicate () {
      this.$refs.duplicateForm.reset()
      this.duplicateForm = false
      this.duplicateObjectList = {}
      this.duplicateValid = false
    },
    saveDuplicate () {
      if (this.$refs.duplicateForm.validate()) {
        this.duplicate(this.duplicateObjectList).then(() => {
          this.cancelDuplicate()
        }).catch(() => this.$root.$error.displayDefaultError())
      }
    },
    cancelShare () {
      this.$refs.shareForm.reset()
      this.shareForm = false
      this.shareObjectList = {}
      this.shareValid = false
    },
    saveShare () {
      if (this.$refs.shareForm.validate()) {
        this.share(this.shareObjectList).then(() => {
          this.cancelShare()
        }).catch(() => this.$root.$error.displayDefaultError())
      }
    },
    loadLists () {
      fetchInitialData(this.$store)
    }
  },
  created () {
    this.loading = true
    this.loadLists()
  },
  mounted () {
    this.$nextTick(function () {
      this.loading = false
    })
  },
  components: {
    'app-nav': Navigation
  }
}
</script>
<style scoped>
.list__tile__content:hover{
  cursor: pointer;
}
</style>
