<template>
  <v-app>
    <router-view/>
    <confirm ref="confirm"></confirm>
    <noty ref="noty"></noty>
    <v-alert type="warning" :value="!isOnline" transition="fade-transition">
      You're not currently connected to Internet. Some features are not available.
    </v-alert>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$root.$confirm = this.$refs.confirm
    this.$root.$noty = this.$refs.noty
  }
}
</script>
<style>
.toolbar{
  z-index: 6;
}

.alert {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
