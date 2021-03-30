import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import News from '../views/News.vue'
import Events from '../views/Events.vue'
import CSI from '../views/CSI.vue'
import Media from '../views/Media.vue'
import Members from '../views/Members.vue'
import Categories from '../views/Categories.vue'
import Users from '../views/Users.vue'
import Messages from '../views/Messages.vue'
import Settings from '../views/Settings.vue'
import Test from '../views/Test.vue'
import Register from '../views/Register.vue'
import PageNotFound from '../components/PageNotFound.vue';

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/news',
    name: 'news',
    component: News,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/events',
    name: 'events',
    component: Events,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/csi',
    name: 'csi',
    component: CSI,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/media',
    name: 'media',
    component: Media,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/members',
    name: 'members',
    component: Members,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/messages',
    name: 'messages',
    component: Messages,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: {
      auth: false,
      title: 'Test Page',
      access: 0
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      auth: false,
      title: 'Registration',
      access: 0
    }
  },
  { path: "*", component: PageNotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    console.log("authenticated?", store.getters['user/AUTHENTICATED']);
    if (!store.getters['user/AUTHENTICATED']){
      return next({
        name: 'login'
      })
    }

    if (to.meta.access === 1){
      var usr = store.getters['user/AUTH_USER']
      if(usr.type != to.meta.access) {
        return next({
          name: 'login'
        })
      }
    }

    next()
  }

  next()
});

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
    from
  }
});

export default router
