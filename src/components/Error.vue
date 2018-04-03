<template>
  <v-snackbar
    :color="options.color"
    v-model="error"
    :timeout="options.timeout"
  >
    {{ message }}
    <v-btn dark flat @click.native="error = false">OK</v-btn>
  </v-snackbar>
</template>
<script>
export default {
  data () {
    return {
      error: false,
      message: null,
      options: {
        color: 'error',
        timeout: 0
      }
    }
  },
  methods: {
    displayError (text) {
      this.message = text
      this.error = true
    },
    displayDefaultError () {
      this.displayError('Damn! Something went wrong.')
    }
  }
}
</script>
