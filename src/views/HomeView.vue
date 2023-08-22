<template>
  <v-card
    class="mx-auto"
    max-width="800"
    flat="true"
  >
    <v-card-item>
      <v-card-title>Home</v-card-title>

      <v-card-subtitle>The arithmetic calculator Project provides a simple calculator functionality (addition, subtraction, multiplication, division, square root, and a random string generation) where each functionality will have a separate cost per request.</v-card-subtitle>
    </v-card-item>

    <v-card-text class="text-left">
      <p>
        <strong>Notes:</strong>
      </p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          You can see the cost per operation in the file seeder <code>/prisma/seed.js</code>
        </li>
        <li class="list-group-item">
          Each user has 100 in the balance by default.
        </li>
        <li class="list-group-item">
          <em>random_string</em> operation used an API from <a
            href="https://api.random.org/json-rpc/4/basic"
            rel="nofollow"
          >https://api.random.org/json-rpc/4/basic</a>.
        </li>
        <li class="list-group-item">
          The arithmetic calculator only allow integer values:
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              JavaScript has a lot of problems with decimal arithmetic operations because it uses binary floating-point numbers to represent decimal values. This can result in rounding errors and imprecise calculations, especially when dealing with decimals that cannot be accurately represented in binary, such as 0.1 or 0.2. Additionally, JavaScript does not have built-in support for arbitrary-precision arithmetic, which can lead to further inaccuracies in calculations involving very large or very small decimal values.
            </li>
          </ul>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>


<script>
export default {
  name: "HomeView",
  components: {},
  data: () => ({
      links: [
        'Home',
        'About',
        'Profile',
        'Updates',
      ],
    }),
};
</script>
