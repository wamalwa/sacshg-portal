import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import news from './news'
import category from './category'
import event from './event'
import upload from './upload'
import address from './address'
import member from './member'
import loan from './loan'
import landing from './landing'
import csi from './csi'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        
    },

    getters: {
        
    },

    mutations: {
        
    },

    actions: {
        
    },

    modules: {
        user,
        news,
        category,
        event,
        upload,
        address,
        member,
        loan,
        landing,
        csi
    }
})