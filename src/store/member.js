import axios from 'axios'

export default {
    namespaced: true,
    state: {
        members: []
    },

    getters: {
        MEMBERS: state => {
            return state.members;
        }
    },

    mutations: {
        SET_MEMBERS: (state, payload) => {
            state.members = payload
        },
        ADD_MEMBER: (state, payload) => {
            state.members.push(payload)
        }
    },

    actions: {
        GET_MEMBERS: async (context) => {
            let { data } = await axios.get('members')
            context.commit('SET_MEMBERS', data.members)
        },
        SAVE_MEMBER: async (context, payload) => {
            let { data } = await axios.post('members/ext', payload)
            context.commit('ADD_MEMBER', data)
        }
    },

    modules: {

    }
}