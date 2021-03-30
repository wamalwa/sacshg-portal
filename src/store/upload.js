import axios from 'axios'

export default {
    namespaced: true,
    state: {
        uploads: [],
    },

    getters: {
        UPLOADS: state => {
            return state.uploads;
        }
    },

    mutations: {
        SET_UPLOADS: (state, payload) => {
            state.uploads = payload
        }
    },

    actions: {
        GET_FILES: async (context) => {
            let { data } = await axios.get('files')
            context.commit('SET_UPLOADS', data)
        }
    },

    modules: {

    }
}