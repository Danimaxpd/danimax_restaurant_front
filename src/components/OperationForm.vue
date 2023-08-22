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
            <v-card-title>Operation</v-card-title>
          </v-card-item>

          <v-card-text>
            <p>
              You can prompt the numbers and the calculator will return the arithmetic calculation or the result depending
              on
              the type of operation you choose.
            </p>
            <v-form
              v-model="valid"
              @submit.prevent="submitForm"
            >
              <v-select
                v-model="operationType"
                label="Operation Type"
                :items="operationTypes"
                :rules="operationTypeRules"
                @update:model-value="validateStates()"
              />
              <v-text-field
                v-if="show_a"
                v-model="a"
                label="A Input"
                :rules="numberTypeRules"
              />
              <v-text-field
                v-if="show_b"
                v-model="b"
                label="B Input"
                :rules="numberTypeRules"
              />
              <v-text-field
                v-if="show_Length"
                v-model="length"
                label="Length"
                :rules="numberTypeRules"
              />
              <v-btn
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
      <v-card flat>
        <v-card-text>
          <v-list class="text-left">
            <strong><v-list-item
              v-for="item in resultOperation"
              :key="item"
              :title="item"
            /></strong>
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
import calculatorApi from '@/services/api-danimax_restaurant'

export default {
  data() {
    return {
      valid: false,
      show_a: true,
      show_b: true,
      show_Length: false,
      operationType: null,
      a: null,
      b: null,
      length: '',
      resultOperation: '',
      resultRaw: '',
      operationTypes: ['addition', 'subtraction', 'multiplication', 'division', 'square_root', 'random_string'],
      operationTypeRules: [
        value => {
          if (value) return true

          return 'Operation type is required.'
        },
        value => {
          if (value?.length >= 1) return true

          return 'The input required a minimum length of 1 character.'
        },
      ],
      numberTypeRules: [
        value => {
          if (value) return true

          return 'Input type is required.'
        },
        value => {
          const isNumber = value?.length >= 1 && !isNaN(Number(value));
          if (isNumber) return true

          return 'The input should be a number with a minimum length of 1 character. '
        },
      ],
      snackbar: {
        show: false,
        message: '',
        color: '',
        timeout: 3000
      }
    };
  },
  methods: {
    resetForm() {
      this.operationType = null;
      this.a = null;
      this.b = null;
      this.length = null;
    },
    async submitForm() {
      try {
        this.resultOperation = '';
        this.resultRaw='';
        if (this.valid) {
          const formData = {
            operationType: this.operationType,
            a: this.a,
            b: this.b,
            length: this.length
          };
          const response = await calculatorApi.createOperation(formData);
          const res = response.data;
          this.resultOperation = [`Operation Result: ${res.operationResult}`,`Operation Type: ${this.operationType}`];
          this.resultRaw = JSON.stringify(res.record);
          this.resetForm();
        }
      } catch (e) {
        this.snackbar = {
          show: true,
          message: e.message,
          color: 'error',
          timeout: 3000
        };
      }
    },
    validateStates() {
      if (this.operationType === this.operationTypes[4]) {
        this.show_a = true;
        this.show_b = false;
        this.show_Length = false;
      } else if (this.operationType === this.operationTypes[5]) {
        this.show_a = false;
        this.show_b = false;
        this.show_Length = true;
      } else {
        this.show_a = true;
        this.show_b = true;
        this.show_Length = false;
      }
    }
  }
};
</script>
  