import jwtDecode from 'jwt-decode';
import { createStore } from 'vuex'
import VuexPersistance from 'vuex-persist';

import danimaxRestaurantApi from '@/services/api-danimax_restaurant'


export default createStore({
  state: {
    isAuthenticated: false,
    token: null,
    username: null,
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserName(state) {
      const userName = state.username || "";
      return userName.charAt(0).toUpperCase() + userName.slice(1);
    },
    getPayloadToken(state, getters) {
      const token = getters.getToken;
      if (token) {
        try {
          return jwtDecode(token);
        } catch (error) {
          console.error('Failed to decode JWT token:', error);
        }
      }
      return null;
    },
  },
  mutations: {
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserName(state, username) {
      state.username = username;
    },
    resetStore(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
      localStorage.removeItem('vuex');
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      // Make an API request to authenticate the user
      const response = await danimaxRestaurantApi.login(username, password);
      const data = response.data;
      // Retrieve the JWT token from the response
      const token = data.token;
      // Set user name
      commit('setUserName', username);
      // Store the token in the state
      commit('setToken', token);
      // Set the authentication status to true
      commit('setIsAuthenticated', true);
    },
    logout({ commit }) {
      commit('resetStore');
    },
  },
  modules: {
  },
  plugins: [new VuexPersistance({
    storage: window.localStorage
  }).plugin]
})
