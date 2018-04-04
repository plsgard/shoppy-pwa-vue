<template>
  <v-snackbar
    :color="options.color"
    v-model="noty"
    :timeout="options.timeout"
  >
    {{ message }}
    <v-btn dark flat @click.native="noty = false">OK</v-btn>
  </v-snackbar>
</template>
<script>
export default {
  data () {
    return {
      noty: false,
      message: '',
      options: {
        color: 'error',
        timeout: 0
      }
    }
  },
  methods: {
    displayError (text) {
      this.message = text
      this.options.color = 'error'
      this.options.timeout = 0
      this.noty = true
    },
    displayDefaultError () {
      this.displayError('Damn! Something went wrong.')
    },
    displaySuccess (text) {
      this.message = text
      this.options.color = 'success'
      this.options.timeout = 6000
      this.noty = true
    }
  }
}
</script>
