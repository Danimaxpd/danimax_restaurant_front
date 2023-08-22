<template>
  <div>
    <v-form
      v-model="valid"
      @submit.prevent="handleSubmit"
    >
      <v-row class="d-flex mb-3">
        <v-col cols="12">
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            variant="outlined"
            color="primary"
            label="Username"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            variant="outlined"
            type="password"
            color="primary"
            label="Password"
          />
        </v-col>
        <v-col
          cols="12"
          class="pt-0"
        >
          <v-btn
            type="submit"
            color="primary"
            size="large"
            block
            flat
          >
            Sign in
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    valid: false,
    username: '',
    password: '',
    usernameRules: [
      value => {
        if (value) return true

        return 'Name is required.'
      },
      value => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
      },
    ],
    passwordRules: [
      value => {
        if (value) return true

        return 'Password is required.'
      },
      value => {
        if (value?.length >= 3) return true

        return 'Password must be valid.'
      },
    ],
    snackbar: {
      show: false,
      message: '',
      color: '',
      timeout: 3000
    }
  }),
  computed: {
    ...mapState(['isAuthenticated'])
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/home');
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleSubmit() {
      try {
        if (this.valid) {
            await this.login({
            username: this.username,
            password: this.password
          });
          this.$router.push('/home');
        }
      } catch (e) {
          this.snackbar = {
            show: true,
            message: 'Authentication failed. Please check your credentials.',
            color: 'error',
            timeout: 3000
          };
      }
    },
  },
}
</script>