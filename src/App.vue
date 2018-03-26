<template>
  <v-app>
    <router-view/>
    <confirm ref="confirm"></confirm>
    <error ref="error"></error>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$root.$confirm = this.$refs.confirm
    this.$root.$error = this.$refs.error
  }
}
</script>
<style>
.toolbar{
  z-index: 6;
}
</style>
