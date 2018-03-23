<template>
  <v-container fluid>
  <v-toolbar
      app
      clipped-left
      fixed
      dark color="secondary">
      <v-btn icon @click.stop="previous">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Page not found!</v-toolbar-title>
    </v-toolbar>
    <v-content class="pt-5">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-text>
              <v-layout align-center column>
                <v-icon x-large color="red">broken_image</v-icon>
              </v-layout>
              <p class="subheading text-xs-center mt-3">Unfortunately, the page what you are looking for does not exists or is not available anymore.<br/>Go back and try another one.</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
</v-container>
</template>
<script>
export default {
  methods: {
    previous () {
      this.$router.go(-1)
    }
  }
}
</script>
