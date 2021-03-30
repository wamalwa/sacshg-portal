import axios from 'axios'

export default {
    namespaced: true,
    state: {
        events: null,
    },

    getters: {
        EVENTS: state => {
            return state.events;
        }
    },

    mutations: {
        SET_EVENTS: (state, payload) => {
            state.events = payload
        },
        ADD_EVENT: (state, payload) => {
            state.events.push(payload)
        },
        UPDATE_EVENT: (state, payload) => {
            Object.assign(state.events[payload.index], { text: payload.data });
        },
        REMOVE_EVENT: (state, payload) => {
            state.events.splice(payload.index, 1)
        }
    },

    actions: {
        GET_EVENTS: async (context) => {
            let { data } = await axios.get('events')
            context.commit('SET_EVENTS', data)
        },
        SAVE_EVENT: async (context, payload) => {
            let { data } = await axios.post('events', payload)
            context.commit('ADD_EVENT', data)
        },
        EDIT_EVENT: async (context, payload) => {
            let { data } = await axios.put('events/' + payload.data.id, payload.data)
            context.commit('UPDATE_EVENT', { index: payload.index, data: data })
        },
        DELETE_EVENT: async (context, payload) => {
            let { data } = await axios.delete('events/' + payload.data.id)
            context.commit('REMOVE_EVENT', { index: payload.index, data: data })
        }
    },

    modules: {

    }
}