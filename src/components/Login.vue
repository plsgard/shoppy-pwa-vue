<template>
<v-container fluid fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-layout align-center column>
          <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
          </v-layout>
          <v-card>
            <v-card-text v-if="isAuthenticated">
              Hello !
            </v-card-text>
            <v-card-text v-else>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  prepend-icon="person"
                  label="E-mail"
                  v-model="username"
                  :rules="emailRules"
                  required
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
                  @click="login"
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
      valid: true,
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
        this.$store.dispatch('login', {username: this.username, password: this.password})
          .then(() => {
            this.username = ''
            this.password = ''
            this.$router.push('/')
          })
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
