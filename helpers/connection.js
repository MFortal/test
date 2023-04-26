const { default: axios } = require("axios");

export const connection = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});
