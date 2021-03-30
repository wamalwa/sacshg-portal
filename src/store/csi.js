import axios from 'axios'

export default {
    namespaced: true,
    state: {
        csi: null,
    },

    getters: {
        CSI: state => {
            return state.csi;
        }
    },

    mutations: {
        SET_CSI: (state, payload) => {
            state.csi = payload
        },
        ADD_CSI: (state, payload) => {
            state.csi.push(payload)
        },
        UPDATE_CSI: (state, payload) => {
            Object.assign(state.csi[payload.index], { text: payload.data });
        },
        REMOVE_CSI: (state, payload) => {
            state.csi.splice(payload.index, 1)
        }
    },

    actions: {
        GET_CSI: async (context) => {
            let { data } = await axios.get('csi')
            context.commit('SET_CSI', data)
        },
        SAVE_CSI: async (context, payload) => {
            let { data } = await axios.post('csi', payload)
            context.commit('ADD_CSI', data)
        },
        EDIT_CSI: async (context, payload) => {
            let { data } = await axios.put('csi/' + payload.data.id, payload.data)
            context.commit('UPDATE_CSI', { index: payload.index, data: data })
        },
        DELETE_CSI: async (context, payload) => {
            let { data } = await axios.delete('csi/' + payload.data.id)
            context.commit('REMOVE_CSI', { index: payload.index, data: data })
        }
    },

    modules: {

    }
}