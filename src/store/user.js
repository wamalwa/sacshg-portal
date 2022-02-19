import axios from 'axios'

export default {
    namespaced: true,
    state: {
        users: [],
        state: null,
        auth_user: {
            refreshToken: localStorage.getItem('refreshToken') || '',
            accessToken: localStorage.getItem('accessToken') || ''
        },
        reset_token: null,
    },

    getters: {
        USERS: state => {
            return state.users;
        },
        STATE: state => {
            return state.state;
        },
        AUTH_USER: state => {
            return state.auth_user;
        },
        AUTHENTICATED: state => {
            return state.auth_user !== null
        },
        RESET_TOKEN: state => {
            return state.reset_token;
        }
    },

    mutations: {
        SET_USERS: (state, payload) => {
            state.users = payload
        },
        SET_STATE: (state, payload) => {
            state.state = payload
        },
        ADD_USER: (state, payload) => {
            state.users.push(payload)
        },
        SET_AUTH_USER: (state, payload) => {
            state.auth_user = payload
        },
        SET_REFRESH_TOKEN: (state, payload) => {
            state.auth_user.accessToken = payload
        },
        SET_AUTH_TOKEN: (state, payload) => {
            if(state.auth_user != null){
                state.auth_user.accessToken = payload
            } else {
                state.auth_user = {
                    accessToken: payload
                }
            }
        },
        SET_RESET_TOKEN: (state, payload) => {
            state.reset_token = payload
        }
    },

    actions: {
        async ATTEMPT({commit,state}, token){
            if (token) {
                commit('SET_AUTH_TOKEN', token)
            }

            if (!state.token) {
                return
            }
        },
        GET_USERS: async (context) => {
            let { data } = await axios.get('users')
            context.commit('SET_USERS', data)
        },
        GET_STATE: async (context) => {
            let { data } = await axios.get('users/state')
            context.commit('SET_STATE', data)
        },
        SAVE_USER: async (context, payload) => {
            let { data } = await axios.post('users', payload)
            context.commit('ADD_USER', data)
        },
        SEND_LINK: async(context, payload) => {
            let { data } = await axios.post('users/request-reset', payload)
            return data.message
        },
        LOGIN: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`https://auth.staugustineshg.org/auth/v1/login`, payload)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            commit('SET_AUTH_USER', data);
                            resolve(true);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        REFRESH_TOKEN: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post(`https://auth.staugustineshg.org/auth/v1/token`, payload)
                    .then(response => {
                        if (status === 200) {
                            commit('SET_REFRESH_TOKEN', response.accessToken)
                            resolve(response);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        LOGOUT: ({ commit }, payload) => {
            return axios.delete(`https://auth.staugustineshg.org/auth/v1/logout`, payload).then(() => {
                commit('SET_AUTH_USER', null)
            })
        },
        GET_RESET_TOKEN: async (context, payload) => {
            let {data} = await axios.post(`validate-token`, payload)
            context.commit('SET_RESET_TOKEN', data)
        },
        CONFIRM_RESET_PASSWORD: async (context, payload) => {
            let {data} = await axios.put(`confirm-reset/${payload.jsaUser.user_id}`, payload)
            context.commit('SET_RESET_TOKEN', data)
        },
    },

    modules: {

    }
}