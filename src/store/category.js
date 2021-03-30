import axios from 'axios'

export default {
    namespaced: true,
    state: {
        categories: null
    },

    getters: {
        CATEGORIES: state => {
            return state.categories;
        }
    },

    mutations: {
        SET_CATEGORIES: (state, payload) => {
            state.categories = payload
        },
        ADD_CATEGORY: (state, payload) => {
            state.categories.push(payload)
        },
        UPDATE_CATEGORY: (state, payload) => {
            Object.assign(state.categories[payload.index], { text: payload.data });
        },
        DELETE_CATEGORY: (state, payload) => {
            state.categories.splice(payload.index, 1)
        }
    },

    actions: {
        GET_CATEGORIES: async (context) => {
            let { data } = await axios.get('categories')
            context.commit('SET_CATEGORIES', data)
        },
        SAVE_CATEGORY: async (context, payload) => {
            let { data } = await axios.post('categories', payload)
            context.commit('ADD_CATEGORY', data)
        },
        EDIT_CATEGORY: async (context, payload) => {
            let { data } = await axios.put('categories/' + payload.data.id, payload.data)
            context.commit('UPDATE_CATEGORY', { index: payload.index, data: data })
        },
        DELETE_CATEGORY: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.delete('categories/' + payload.data.id).then(response => {
                    if(response.data.status === 1000){
                        context.commit('DELETE_CATEGORY', { index: payload.index, data: response.data })
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },

    modules: {

    }
}