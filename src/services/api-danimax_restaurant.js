import axios from 'axios'
const moment = require('moment');
const apiUrl = process.env.VUE_APP_BACKEND_API_URL;


const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
})

api.interceptors.request.use(
  (config) => {
    const updatedVuexData = localStorage.getItem('vuex');
    const updatedVuexObject = JSON.parse(updatedVuexData);
    const updatedToken = updatedVuexObject?.token;
    config.headers.Authorization = `Bearer ${updatedToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  async getRecords(params) {
    try {
      const response = await api.get(`/api/${apiVersion}/records/filter?${params}`);
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
  async deletedRecord(record_id) {
    try {
      const response = await api.delete(`/api/${apiVersion}/records/by_id/${record_id}`);
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
  async createOperation(bodyData) {
    try {
      const response = await api.post(`/api/${apiVersion}/calculator/operation`, bodyData);
      return response.data
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error(error.response.data.data.message);
      }

      throw new Error(error);
    }
  },
  async login(username, password) {
    try {
      const currentDate = moment().utc().format("YYYY-MM-DD");
      const uuid = process.env.VUE_APP_CALCULATOR_API_VALID_PASS_ID;
      const passId = `${uuid}-${currentDate}`;

      const response = await api.post('/auth/getToken', {
        passId,
        username,
        password,
      })
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
}
