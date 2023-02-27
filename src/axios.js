/* eslint-disable camelcase */
import axios from "axios";

const baseURL = "http://ambuehll.pythonanywhere.com/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : null,
    "Content-Type": "application/json",
    accept: "application/json"
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(`Original Request ${originalRequest}`);

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occured. " +
          "looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }
    if (error.response.status === 401 && originalRequest.url === `${baseURL}token/refresh/`) {
      window.location.href = "/";
      return Promise.reject(error);
    }
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        const tokenparts = JSON.parse(atob(refresh_token.split(".")[1]));

        const now = Math.ceil(Date.now() / 1000);
        console.log(`token exp date ${tokenparts.exp}`);
        if (tokenparts.exp > now) {
          axiosInstance
            .post("token/refresh/", { refresh: refresh_token })
            .then((res) => {
              localStorage.setItem("access_token", res.data.access);
              localStorage.setItem("refresh_token", res.data.refresh);
              axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.access}`;
              originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("refresh token expired", tokenparts.exp, now);
          window.location.href = "/";
        }
      }
    }
  }
);

export default axiosInstance;
