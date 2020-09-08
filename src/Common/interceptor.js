import axios from "axios";
import Constants from "../Constants";
var numberOfAxiosCAllPending = 0;
axios.interceptors.request.use(
  config => {
    // console.log(Constants.POLLING.MAX_PENDING_REQUESTS_LIMIT);
    if (
      numberOfAxiosCAllPending <= Constants.POLLING.MAX_PENDING_REQUESTS_LIMIT
    ) {
      numberOfAxiosCAllPending++;
      let token = localStorage.getItem(Constants.LOCALSTORAGE.AUTH_KEY);

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    }
    throw new axios.Cancel("Operation canceled by the user.");
  },

  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function(response) {
    numberOfAxiosCAllPending--;
    // console.log("------------  Ajax pending", numberOfAxiosCAllPending);

    if (numberOfAxiosCAllPending == 0) {
      //hide loader
    }
    return response;
  },
  function(error) {
    numberOfAxiosCAllPending--;
    return Promise.reject(error);
  }
);

export default axios;
