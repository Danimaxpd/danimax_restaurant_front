<template>
  <v-card
    class="mx-auto"
    max-width="800"
    flat="true"
  >
    <v-card-item class="text-left">
      <v-card-title>
        Free lunch
      </v-card-title>

      <v-card-subtitle>
        Click in "Kitchen" text on the left menu to continue
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <p>
        The objective of this technical task is to create Being able to solve the need of the restaurant manager, who must be able to tell the kitchen that a meal must be prepared dish, the kitchen randomly selects the dish to be prepared and asks the warehouse for food, the required ingredients, if the warehouse has availability, deliver the ingredients to the kitchen, if you don't have to buy them in the market place. when the kitchen receives the ingredients, prepares the dish, and delivers the prepared dish.
      </p>
      <p>
        <strong>For this I have implemented a serverless event-oriented solution, which allows us to manage random dishes dynamically and very quickly.</strong>
      </p>
      <p>
        More information: <a
          href="https://github.com/Danimaxpd/danimax_restaurant"
          target="_blank"
        >https://github.com/Danimaxpd/danimax_restaurant</a>
      </p> 
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  name: "HomeView",
  components: {},
  data: () => ({}),
};
</script>
