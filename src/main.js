import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import fullscreen from 'vue-fullscreen'

import axios from 'axios'

import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use(fullscreen)
Vue.use(CKEditor)

require('@/store/subscriber')

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://api.staugustineshg.org/api/v2/'

let isRefreshing = false;
let subscribers = [];

axios.defaults.headers.common['Authorization'] = "Bearer " + store.state.user.auth_user.accessToken;

axios.interceptors.response.use(response => {
  return response;
}, err => {
  if(err == 'Error: Network Error') {
    const {
      config
    } = err;

    console.log('rejecting...', config.url)

    return Promise.reject(err);
  }

  const {
    config,
    response: { status, data }
  } = err;

  const originalRequest = config;

  if (status === 401 || data.status === 403) {
    router.push({ name: "login" });
    return Promise.reject(false);
  }

  if (data.status === 4001 || data.status === 4013 || data.status === 4023) {
    router.push({ name: "login" });
    return Promise.reject(false);
  }

  if (originalRequest.url.includes("login")) {
    return Promise.reject(err);
  }

  if (status === 403 && data.status === 4023) {
    if (!isRefreshing) {
      isRefreshing = true;
      store.dispatch("user/REFRESH_TOKEN", { token: localStorage.getItem('refreshToken') }).then(({ status }) => {
        if (status === 200 || status === 204) {
          isRefreshing = false;
        }
        subscribers = [];
      }).catch(error => {
        console.error(error);
      });
    }

    const requestSubscribers = new Promise(resolve => {
      subscribeTokenRefresh(() => {
        resolve(axios(originalRequest));
      });
    });

    onRefreshed();

    return requestSubscribers;
  } else {
    return Promise.reject(err);
  }
});

function subscribeTokenRefresh(cb) {
  console.log(cb);
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.map(cb => cb());
}

subscribers = [];

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')