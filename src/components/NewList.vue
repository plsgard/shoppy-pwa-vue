<template>
<v-container fluid>
  <v-toolbar
      app
      clipped-left
      fixed>
      <v-btn icon @click.stop="previous">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>New List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat large @click.stop="create" :disabled="!valid">
        OK
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-text>
              <v-form v-model="valid" v-on:submit.prevent ref="form" lazy-validation>
                <v-text-field
                  label="Define a name for your list"
                  v-model.lazy.trim="name"
                  :counter="50"
                  :rules="nameRules"
                  required
                  @keyup.enter="create"
                  autofocus
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
</v-container>
</template>
<script>
  import apiService from '@/api/api.service.js'
  export default {
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ]
    }),
    methods: {
      previous () {
        this.$router.go(-1)
      },
      create () {
        if (this.$refs.form.validate()) {
          apiService.createList({ name: this.name }).then(() => {
            this.$store.dispatch('listsModule/getLists')
            this.previous()
          })
        }
      }
    }
  }
</script>
