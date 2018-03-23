<template>
<v-container fluid fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-layout align-center column>
          <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5" width="200">
          </v-layout>
          <v-card class="elevation-12">
            <v-toolbar dark color="secondary">
                <v-toolbar-title>Welcome on Shoppy app</v-toolbar-title>
              </v-toolbar>
            <v-card-text v-if="isAuthenticated">
              <p class="subheading my-1">You're authenticated!</p>
            </v-card-text>
            <v-card-text v-else>
              <v-form v-model="valid" v-on:submit.prevent ref="form" lazy-validation id="login">
                <v-text-field
                  prepend-icon="person"
                  label="E-mail"
                  v-model.lazy="username"
                  :rules="emailRules"
                  required
                  @keyup.enter="login"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  v-model="password"
                  :append-icon="passwordHint ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (passwordHint = !passwordHint)"
                  :type="!passwordHint ? 'password' : 'text'"
                  required
                  @keyup.enter="login"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions v-if="isAuthenticated">
              <v-spacer></v-spacer>
              <v-btn @click="logout"
                >
                  logout
                </v-btn>
            </v-card-actions>
            <v-card-actions v-else>
              <v-spacer></v-spacer>
              <v-btn color="primary"
                  @click.prevent="login"
                  :disabled="!valid"
                >
                  login
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    ...mapActions({
      logout: 'logout'
    }),
    data: () => ({
      valid: false,
      username: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordHint: false
    }),
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    methods: {
      login () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('login', {username: this.username, password: this.password})
            .then(() => {
              this.username = ''
              this.password = ''
              this.$router.push('/')
            })
        }
      },
      logout () {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
      }
    }
  }
</script>
