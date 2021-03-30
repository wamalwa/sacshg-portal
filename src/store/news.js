import axios from 'axios'

export default {
    namespaced: true,
    state: {
        news: null,
    },

    getters: {
        NEWS: state => {
            return state.news;
        }
    },

    mutations: {
        SET_NEWS: (state, payload) => {
            state.news = payload
        },
        ADD_NEWS: (state, payload) => {
            state.news.push(payload)
        },
        UPDATE_NEWS: (state, payload) => {
            Object.assign(state.news[payload.index], { text: payload.data });
        },
        DELETE_NEWS_ITEM: (state, payload) => {
            state.news.splice(payload.index, 1)
        }
    },

    actions: {
        GET_NEWS: async (context) => {
            let { data } = await axios.get('news')
            context.commit('SET_NEWS', data)
        },
        SAVE_NEWS: async (context, payload) => {
            let { data } = await axios.post('news', payload)
            context.commit('ADD_NEWS', data)
        },
        EDIT_NEWS: async (context, payload) => {
            let { data } = await axios.put('news/' + payload.data.id, payload.data)
            context.commit('UPDATE_NEWS', { index: payload.index, data: data })
        },
        DELETE_NEWS: async (context, payload) => {
            let { data } = await axios.delete('news/' + payload.data.id)
            context.commit('DELETE_NEWS_ITEM', { index: payload.index, data: data })
        }
    },

    modules: {

    }
}