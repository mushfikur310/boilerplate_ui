import axios from 'axios';

import appConfig from 'appConfig';
axios.defaults.baseURL = appConfig.ApiUrl;
axios.interceptors.request.use((config) => {
    let accessSecret;
    if(config.url === "auth/verify/otp" || config.url === "auth/reset/password"){
      accessSecret = window.localStorage.getItem('casserole_auth_reset');
    }else{
      accessSecret = window.localStorage.getItem('casserole_auth');
    }
    if (accessSecret !== null || accessSecret !== undefined) {
      config.headers.authorization = accessSecret;
      config.headers.timezone = Date.now();
      return config;
    }
    return config;
  });
  
  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => Promise.reject(error.message));

export default axios;