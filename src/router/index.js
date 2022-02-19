import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 1
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      auth: false,
      title: 'JSASHG',
      access: 0
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 1
    }
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/Events.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 1
    }
  },
  {
    path: '/csi',
    name: 'csi',
    component: () => import('../views/CSI.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 1
    }
  },
  {
    path: '/media',
    name: 'media',
    component: () => import('../views/Media.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 1
    }
  },
  {
    path: '/members',
    name: 'members',
    component: () => import('../views/Members.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 3
    }
  },
  {
    path: '/loans',
    name: 'loans',
    component: () => import('../views/Loans.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 3
    }
  },
  {
    path: '/loan/:id',
    name: 'loan',
    component: () => import('../views/Loan.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 3
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/Categories.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 2
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 3
    }
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import('../views/Messages.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 1
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      auth: true,
      title: 'JSASHG',
      access: 2
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Test.vue'),
    meta: {
      auth: false,
      title: 'Test Page',
      access: 0
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      auth: false,
      title: 'Registration',
      access: 0
    }
  },
  {
    path: '/reset-password',
    name: 'reset',
    component: () => import('../views/ResetPassword.vue'),
    meta: {
      auth: false,
      title: 'Reset Password',
      access: 0
    }
  },
  {
    path: '/reset-password/:token',
    name: 'confirm-reset',
    component: () => import('../views/ConfirmReset.vue'),
    meta: {
      auth: false,
      title: 'Reset Password',
      access: 0
    },
  },
  {
    path: '/member/:id',
    name: 'member',
    component: () => import('../views/Member.vue'),
    meta: {
      auth: true,
      title: 'Member',
      access: 3
    }
  },
  {
    path: "*",
    component: () => import('../components/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    console.log("authenticated?", store.getters['user/AUTHENTICATED']);
    if (!store.getters['user/AUTHENTICATED']) {
      return next({
        name: 'login'
      })
    }

    if (to.meta.access > 0) {
      var usr = store.getters['user/AUTH_USER']

      if (usr.type && usr.type < to.meta.access) {
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
