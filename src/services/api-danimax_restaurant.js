import axios from 'axios'
const apiUrl = process.env.VUE_APP_BACKEND_API_URL;
const apiVersion = 'v1';


const api = axios.create({
  baseURL: apiUrl
})

// Delete headers backend not required
api.interceptors.request.use(
  (config) => {
    delete config.headers;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  async getRecords(params) {
    try {
      const response = await api.get(`/dev/${apiVersion}/orders?${params}`);
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWarehouseInventoryRecords(params) {
    try {
      const response = await api.get(`/dev/${apiVersion}/warehouse/inventory?${params}`);
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
  async getWarehousePurchasedRecords(params) {
    try {
      const response = await api.get(`/dev/${apiVersion}/warehouse/purchased?${params}`);
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
  async getCurrentRecords(params) {
    try {
      const response = await api.get(`/dev/${apiVersion}/orders/current?${params}`);
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
  async reProcessOrder(orderId) {
    try {
      const bodyData = {
        orderId
      }
      const response = await api.post(`/dev/${apiVersion}/re_process_order`, bodyData);
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  },
  async createOrder(bodyData) {
    try {
      const response = await api.post(`/dev/${apiVersion}/orders`, bodyData);
      return response.data
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error(error.response.data.data.message);
      }

      throw new Error(error);
    }
  },
}
