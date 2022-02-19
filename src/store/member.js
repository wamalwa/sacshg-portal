import axios from 'axios'

export default {
    namespaced: true,
    state: {
        members: [],
        member: null,
        nok: null,
        beneficiaries: [],
        update_result: {
            status: "",
            message: ""
        }
    },

    getters: {
        MEMBERS: state => {
            return state.members;
        },
        MEMBER: state => {
            return state.member;
        },
        NOK: state => {
            return state.nok;
        },
        BENEFICIARIES: state => {
            return state.beneficiaries;
        },
        UPDATE_RESULT: state => {
            return state.update_result
        },
    },

    mutations: {
        SET_MEMBERS: (state, payload) => {
            state.members = payload
        },
        SET_MEMBER: (state, payload) => {
            state.member = payload
        },
        SET_NOK: (state, payload) => {
            state.nok = payload
        },
        SET_BENEFICIARIES: (state, payload) => {
            state.beneficiaries = payload;
        },
        ADD_MEMBER: (state, payload) => {
            state.members.push(payload)
        },
        UPDATE_RESULT: (state, payload) => {
            state.update_result = payload;
        }
    },

    actions: {
        GET_MEMBERS: async (context) => {
            let { data } = await axios.get('members')
            context.commit('SET_MEMBERS', data.members)
        },
        GET_MEMBER: async (context, payload) => {
            let { data } = await axios.get('members/' + payload)
            context.commit('SET_MEMBER', data)
        },
        GET_NOK: async (context, payload) => {
            let { data } = await axios.get('nok/member/' + payload)
            if(data.length>0){
                context.commit('SET_NOK', data[0])
            }
        },
        GET_BENEFICIARIES: async (context, payload) => {
            let { data } = await axios.get('beneficiary/member/' + payload)
            context.commit('SET_BENEFICIARIES', data)
        },
        SAVE_MEMBER: async (context, payload) => {
            let { data } = await axios.post('members/ext', payload)
            context.commit('ADD_MEMBER', data)
        },
        UPDATE_MEMBER_STATUS: async (context, payload) => {
            let { data } = await axios.patch(`members/${payload.id}/review`, {
                action: payload.action,
                comment: payload.comment
            })
            context.commit('UPDATE_RESULT', data)
        }
    },

    modules: {

    }
}