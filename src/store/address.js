import axios from 'axios'

export default {
    namespaced: true,
    state: {
        counties: [],
        county_towns: [],
        county_towns1: []
    },

    getters: {
        COUNTIES: state => {
            return state.counties;
        },
        COUNTY_TOWNS: state => {
            return state.county_towns;
        },
        COUNTY_TOWNS1: state => {
            return state.county_towns1;
        }
    },

    mutations: {
        SET_COUNTIES: (state, payload) => {
            state.counties = payload
        },
        SET_COUNTY_TOWNS: (state, payload) => {
            state.county_towns = payload
        },
        SET_COUNTY_TOWNS1: (state, payload) => {
            state.county_towns1 = payload
        },
        ADD_COUNTY: (state, payload) => {
            state.counties.push(payload)
        }
    },

    actions: {
        GET_COUNTIES: async (context) => {
            let { data } = await axios.get('counties')
            context.commit('SET_COUNTIES', data)
        },
        GET_COUNTY_TOWNS: async (context, payload) => {
            let { data } = await axios.get('towns/county/' + payload)
            context.commit('SET_COUNTY_TOWNS', data)
        },
        GET_COUNTY_TOWNS1: async (context, payload) => {
            let { data } = await axios.get('towns/county/' + payload)
            context.commit('SET_COUNTY_TOWNS1', data)
        },
        SAVE_COUNTY: async (context, payload) => {
            let { data } = await axios.post('counties', payload)
            context.commit('ADD_COUNTY', data)
        }
    },

    modules: {

    }
}