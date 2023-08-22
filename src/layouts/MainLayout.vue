<template>
  <v-app id="inspire">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/lego/5.jpg"
            :title="userName"
          />
        </v-list>
        <v-divider />
        <v-list
          density="compact"
          nav
        >
          <v-list-item
            v-for="link in links"
            :key="link"
            :to="link.route"
            :prepend-icon="link.icon"
            :title="link.name"
          />
        </v-list>
        <template #append>
          <div class="pa-2" />
        </template>
      </v-navigation-drawer>
      <v-main>
        <v-app-bar
          scroll-behavior="collapse"
          :elevation="2"
          class="px-3"
          flat
          dense
        >
          <template #prepend>
            <v-app-bar-nav-icon
              text="Menu"
              @click.stop="drawer = !drawer"
            />
          </template>
          <v-app-bar-title prepend-icon="mdi-calculator-variant">
            Danimax Restaurant ¡Free!
          </v-app-bar-title>
          <v-spacer />
        </v-app-bar>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <v-sheet
                min-height="70vh"
                rounded="lg"
                class="p-4"
              >
                <router-view />
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>    

<script>
import { mapActions } from 'vuex';
export default {
  name: "MainLayout",
  data: () => ({
    drawer: null,
    links: [
      { name: 'Home', route: "/home", icon: "mdi-home-assistant" },
      { name: 'Kitchen', route: "/operation", icon: "mdi-silverware-fork-knife" },
      { name: 'Orders', route: "/records", icon: "mdi-food-steak" },
      { name: 'Queues Orders', route: "/queues", icon: "mdi-food-steak-off" },
      { name: 'Inventory', route: "/warehouse/inventory", icon: "mdi-warehouse" },
      { name: 'Purchases', route: "/warehouse/purchased", icon: "mdi-bank-transfer" },
    ],
  }),
  computed: {
    userName() {
      return this.$store.getters.getUserName || "Anonymous";
    },
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/');
    }
  }
};
</script>
<style>
#inspire {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
  