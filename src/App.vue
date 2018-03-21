<template>
  <v-app>
    <router-view/>
    <!-- <v-footer fixed app>
      <span>&copy; 2018</span>
    </v-footer> -->
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
