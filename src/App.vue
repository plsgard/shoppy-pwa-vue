<template>
  <v-app>
    <router-view/>
    <confirm ref="confirm"></confirm>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$root.$confirm = this.$refs.confirm
  }
}
</script>
<style>
.toolbar{
  z-index: 6;
}
</style>
