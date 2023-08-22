<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <!-- Content for the left column -->
      <div class="left-column">
        <v-card class="mx-auto">
          <v-card-item>
            <v-card-title>Create order</v-card-title>
          </v-card-item>

          <v-card-text>
            <p>
              Click in the green button to create a new order
            </p>
            <v-form @submit.prevent="submitForm">
              <v-btn
                :disabled="requestInProgress"
                type="submit"
                color="primary"
              >
                Submit
              </v-btn>
            </v-form>
          </v-card-text>
          <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
          >
            {{ snackbar.message }}
          </v-snackbar>
        </v-card>
      </div>
    </v-col>
    <v-col
      cols="12"
      md="6"
    >
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="green"
      />
      <v-card
        v-if="!loading"
        flat
      >
        <v-card-text>
          <v-list class="text-left">
            <p>Recipe Name: <strong>{{ recipeName }}</strong></p>
          </v-list>
          <v-divider />
          <v-code class="text-justify">
            <code>{{ resultRaw }}</code>
          </v-code>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
  
<script>
import danimaxRestaurantApi from '@/services/api-danimax_restaurant'

export default {
  data() {
    return {
      requestInProgress: false,
      loading: false,
      recipeName: '',
      resultRaw: '',
      snackbar: {
        show: false,
        message: '',
        color: '',
        timeout: 3000
      }
    };
  },
  methods: {
    async submitForm() {
      // Exit early if a request is already in progress
      if (this.requestInProgress) {
        return;
      }
      this.requestInProgress = true;
      this.loading = true;
      try {
        this.recipeName = '';
        this.resultRaw='';
        const formData = {};
        const response = await danimaxRestaurantApi.createOrder(formData);
        this.recipeName = response.message.name;
        this.resultRaw = JSON.stringify(response.message.ingredients);
        this.snackbar = {
          show: true,
          message: "Order created successfully, wait for the kitchen to prepare the dish",
          color: 'success',
          timeout: 3000
        }
      } catch (e) {
        console.error("e", e); 
        this.snackbar = {
          show: true,
          message: e.message,
          color: 'error',
          timeout: 3000
        };
      } finally {
        this.loading = false
        // Set requestInProgress back to false once request is done
        this.requestInProgress = false;
      }
    }
  }
};
</script>
  