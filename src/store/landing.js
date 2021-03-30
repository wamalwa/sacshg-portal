import axios from 'axios'

export default {
    namespaced: true,
    state: {
        carousels: [],
        faqs: [],
        services: [],
        testimonials: [],
        website: { id: 0, name: "", web_address: "", mission: "", vision: "", about: "", svc_photo_url: "", address: "", phone: "", email: "" }
    },

    getters: {
        WEBSITE: state => {
            return state.website;
        },
        CAROUSELS: state => {
            return state.carousels;
        },
        FAQS: state => {
            return state.faqs;
        },
        SERVICES: state => {
            return state.services;
        },
        TESTIMONIALS: state => {
            return state.testimonials;
        }
    },

    mutations: {
        SET_WEBSITE: (state, payload) => {
            state.website = payload
        },
        UPDATE_COMPONENT: (state, payload) => {
            state.website[payload.key] = payload.val
        },
        SET_CAROUSELS: (state, payload) => {
            state.carousels = payload
        },
        ADD_CAROUSEL: (state, payload) => {
            state.carousels.push(payload)
        },
        UPDATE_CAROUSEL: (state, payload) => {
            Object.assign(state.carousels[payload.index], { text: payload.data });
        },
        DELETE_CAROUSEL: (state, payload) => {
            state.carousels.splice(payload.index, 1)
        },
        SET_FAQS: (state, payload) => {
            state.faqs = payload
        },
        ADD_FAQ: (state, payload) => {
            state.faqs.push(payload)
        },
        UPDATE_FAQ: (state, payload) => {
            Object.assign(state.faqs[payload.index], { text: payload.data });
        },
        DELETE_FAQ: (state, payload) => {
            state.faqs.splice(payload.index, 1)
        },
        SET_SERVICES: (state, payload) => {
            state.services = payload
        },
        ADD_SERVICE: (state, payload) => {
            state.services.push(payload)
        },
        UPDATE_SERVICE: (state, payload) => {
            Object.assign(state.services[payload.index], { text: payload.data });
        },
        DELETE_SERVICE: (state, payload) => {
            state.services.splice(payload.index, 1)
        },
        SET_TESTIMONIALS: (state, payload) => {
            state.testimonials = payload
        },
        ADD_TESTIMONIAL: (state, payload) => {
            state.testimonials.push(payload)
        },
        UPDATE_TESTIMONIAL: (state, payload) => {
            Object.assign(state.testimonials[payload.index], { text: payload.data });
        },
        DELETE_TESTIMONIAL: (state, payload) => {
            state.testimonials.splice(payload.index, 1)
        }
    },

    actions: {
        GET_WEBSITE: async (context) => {
            let { data } = await axios.get('landing/website')
            context.commit('SET_WEBSITE', data)
        },
        SAVE_COMPONENT: async (context, payload) => {
            console.log(payload);
            let { data } = await axios.post('landing/website/component', payload);
            console.log(data)
            context.commit('UPDATE_COMPONENT', payload)
        },
        GET_CAROUSELS: async (context) => {
            let { data } = await axios.get('landing/carousel')
            context.commit('SET_CAROUSELS', data)
        },
        SAVE_CAROUSEL: async (context, payload) => {
            let { data } = await axios.post('landing/carousel', payload)
            context.commit('ADD_CAROUSEL', data)
        },
        EDIT_CAROUSEL: async (context, payload) => {
            let { data } = await axios.put('landing/carousel/' + payload.data.id, payload.data)
            context.commit('UPDATE_CAROUSEL', { index: payload.index, data: data })
        },
        DELETE_CAROUSEL: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.delete('landing/carousel/' + payload.data.id).then(response => {
                    if (response.data.status === 1000) {
                        context.commit('DELETE_CAROUSEL', { index: payload.index, data: response.data })
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GET_FAQS: async (context) => {
            let { data } = await axios.get('landing/faq')
            context.commit('SET_FAQS', data)
        },
        SAVE_FAQ: async (context, payload) => {
            let { data } = await axios.post('landing/faq', payload)
            context.commit('ADD_FAQ', data)
        },
        EDIT_FAQ: async (context, payload) => {
            let { data } = await axios.put('landing/faq/' + payload.data.id, payload.data)
            context.commit('UPDATE_FAQ', { index: payload.index, data: data })
        },
        DELETE_FAQ: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.delete('landing/faq/' + payload.data.id).then(response => {
                    if (response.data.status === 1000) {
                        context.commit('DELETE_FAQ', { index: payload.index, data: response.data })
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GET_SERVICES: async (context) => {
            let { data } = await axios.get('landing/services')
            context.commit('SET_SERVICES', data)
        },
        SAVE_SERVICE: async (context, payload) => {
            let { data } = await axios.post('landing/services', payload)
            context.commit('ADD_SERVICE', data)
        },
        EDIT_SERVICE: async (context, payload) => {
            let { data } = await axios.put('landing/services/' + payload.data.id, payload.data)
            context.commit('UPDATE_SERVICE', { index: payload.index, data: data })
        },
        DELETE_SERVICE: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.delete('landing/services/' + payload.data.id).then(response => {
                    if (response.data.status === 1000) {
                        context.commit('DELETE_SERVICE', { index: payload.index, data: response.data })
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GET_TESTIMONIALS: async (context) => {
            let { data } = await axios.get('landing/testimonials')
            context.commit('SET_TESTIMONIALS', data)
        },
        SAVE_TESTIMONIAL: async (context, payload) => {
            let { data } = await axios.post('landing/testimonials', payload)
            context.commit('ADD_TESTIMONIAL', data)
        },
        EDIT_TESTIMONIAL: async (context, payload) => {
            let { data } = await axios.put('landing/testimonials/' + payload.data.id, payload.data)
            context.commit('UPDATE_TESTIMONIAL', { index: payload.index, data: data })
        },
        DELETE_TESTIMONIAL: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.delete('landing/testimonials/' + payload.data.id).then(response => {
                    if (response.data.status === 1000) {
                        context.commit('DELETE_TESTIMONIAL', { index: payload.index, data: response.data })
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