import { Fetch } from 'fego-rn';

export default {
  init() {
    Fetch.defaults.baseURL = 'http://localhost:3001/api';
    Fetch.defaults.timeout = 3000;
    Fetch.interceptors.request.use((config) => {
      if (config.method === 'post') {
        // const data = config.data || {};
        //  dosomthing
        return config;
      } else {
        return config;
      }
    }, error => Promise.reject(error));

    Fetch.interceptors.response.use(
      (response) => {
        const requestUrl = response.config.url;
        if (requestUrl.indexOf('common/sendImgCode.html') !== -1) {
          return response;
        } else {
          const data = response.data;
          const retcode = data.retcode;
          if (__DEV__) {
            console.log(JSON.stringify(data));
          }
          if (retcode !== 100) {
            return Promise.reject(data.retdesc);
          } else {
            return data;
          }
        }
      },
      (error) => {
        if (__DEV__) {
          console.log(JSON.stringify(error));
        }
        const err = (error && error.response && error.response.data) || '出现点小问题，请重试！';
        return Promise.reject(err);
      },
    );
  },
};
