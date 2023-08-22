<template>
  <div class="authentication">
    <v-container
      fluid
      class="pa-3"
    >
      <v-row class="h-100vh d-flex justify-center align-center">
        <v-col
          cols="12"
          lg="4"
          xl="3"
          class="d-flex align-center"
        >
          <v-card
            rounded="md"
            elevation="10"
            class="px-sm-1 px-0 withbg mx-auto"
            max-width="700"
            min-width="500"
          >
            <v-card-item class="pa-sm-8">
              <div class="d-flex justify-center py-4"> 
                Arithmetic calculator
              </div>
              <LoginForm />
              <h6 class="text-h6 text-muted font-weight-medium d-flex justify-center align-center mt-3">
                <RouterLink
                  to="/auth/register"
                  class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium pl-2"
                >
                  Create an account
                </RouterLink>
              </h6>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>
<style>
.authentication::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.3;
  left: 0;
  top: 0;
  bottom: 0;
  background: radial-gradient(#d2f1df, #d3d7fa, #bad8f4) 0% 0% / 400% 400%;
}

</style>