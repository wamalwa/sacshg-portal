import axios from 'axios'

export default {
    namespaced: true,
    state: {
        feedback: [],
    },

    getters: {
        FEEDBACK: state => {
            return state.feedback;
        }
    },

    mutations: {
        SET_FEEDBACK: (state, payload) => {
            state.feedback = payload
        }
    },

    actions: {
        GET_FEEDBACK: async (context) => {
            let { data } = await axios.get('feedback')
            console.log(data);
            context.commit('SET_FEEDBACK', data)
        },
    },

    modules: {

    }
}