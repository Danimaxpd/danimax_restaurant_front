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
          <div class="pa-2">
            <v-btn
              block
              prepend-icon="mdi-logout"
              @click="handleLogout"
            >
              Logout
            </v-btn>
          </div>
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
            Arithmetic calculator
          </v-app-bar-title>
          <v-spacer />
          <v-btn
            icon
            @click="handleLogout"
          >
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-app-bar>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="2"
            />

            <v-col
              cols="12"
              sm="8"
            >
              <v-sheet
                min-height="70vh"
                rounded="lg"
                class="p-4"
              >
                <router-view />
              </v-sheet>
            </v-col>

            <v-col
              cols="12"
              sm="2"
            />
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
      { name: 'Operation', route: "/operation", icon: "mdi-calculator" },
      { name: 'Records', route: "/records", icon: "mdi-google-spreadsheet" },
    ],
  }),
  computed: {
    userName() {
      return this.$store.getters.getUserName;
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
  