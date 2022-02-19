import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loans: [],
        loan: null
    },

    getters: {
        LOANS: state => {
            return state.loans;
        },
        LOAN: state => {
            return state.loan;
        }
    },

    mutations: {
        SET_LOANS: (state, payload) => {
            state.loans = payload
        },
        SET_LOAN: (state, payload) => {
            state.loan = payload
        }
    },

    actions: {
        GET_LOANS: async (context) => {
            let { data } = await axios.get('loans')
            context.commit('SET_LOANS', data.loans)
        },
        GET_LOAN: async (context, payload) => {
            let { data } = await axios.get('loans/' + payload)
            context.commit('SET_LOAN', data)
        },
        UPDATE_STATUS: async (context, payload) => {
            let { data } = await axios.put('loans/' + payload.data.id, payload.data.status)
            return data;
        }
    },

    modules: {

    }
}