import axios from 'axios'

export default {
    namespaced: true,
    state: {
        carousels: [],
        faqs: [],
        products: [],
        services: [],
        testimonials: [],
        officials: [],
        dashboard: [],
        website: {
            id: 0,
            name: "",
            web_address: "",
            mission: "",
            vision: "",
            about: "",
            svc_photo_url: "",
            address: "",
            phone: "",
            email: "",
            members: 0,
            awards: 0,
            capital: 0,
            loans: 0 }
    },

    getters: {
        WEBSITE: state => {
            return state.website;
        },
        DASHBOARD: state => {
            return state.dashboard;
        },
        CAROUSELS: state => {
            return state.carousels;
        },
        FAQS: state => {
            return state.faqs;
        },
        PRODUCTS: state => {
            return state.products;
        },
        SERVICES: state => {
            return state.services;
        },
        TESTIMONIALS: state => {
            return state.testimonials;
        },
        OFFICIALS: state => {
            return state.officials.map((item) => {
                return {...item, avatar: item.avatar_url}
            });
        }
    },

    mutations: {
        SET_WEBSITE: (state, payload) => {
            state.website = payload
        },
        SET_DASHBOARD: (state, payload) => {
            state.dashboard = payload
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
        SET_PRODUCTS: (state, payload) => {
            state.products = payload
        },
        ADD_PRODUCT: (state, payload) => {
            state.products.push(payload)
        },
        UPDATE_PRODUCT: (state, payload) => {
            Object.assign(state.products[payload.index], { text: payload.data });
        },
        DELETE_PRODUCT: (state, payload) => {
            state.products.splice(payload.index, 1)
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
        },
        SET_OFFICIALS: (state, payload) => {
            state.officials = payload
        },
        ADD_OFFICIAL: (state, payload) => {
            state.officials.push(payload)
        },
        UPDATE_OFFICIAL: (state, payload) => {
            Object.assign(state.officials[payload.index], { text: payload.data });
        },
        DELETE_OFFICIAL: (state, payload) => {
            state.officials.splice(payload.index, 1)
        }
    },

    actions: {
        GET_WEBSITE: async (context) => {
            let { data } = await axios.get('landing/website')
            context.commit('SET_WEBSITE', data)
        },
        GET_DASHBOARD: async (context) => {
            let { data } = await axios.get('dashboard')
            context.commit('SET_DASHBOARD', data)
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
        GET_PRODUCTS: async (context) => {
            let { data } = await axios.get('landing/products')
            context.commit('SET_PRODUCTS', data)
        },
        SAVE_PRODUCT: async (context, payload) => {
            let { data } = await axios.post('landing/products', payload)
            context.commit('ADD_PRODUCT', data)
        },
        EDIT_PRODUCT: async (context, payload) => {
            let { data } = await axios.put('landing/products/' + payload.data.id, payload.data)
            context.commit('UPDATE_PRODUCT', { index: payload.index, data: data })
        },
        DELETE_PRODUCT: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.delete('landing/products/' + payload.data.id).then(response => {
                    if (response.data.status === 1000) {
                        context.commit('DELETE_PRODUCT', { index: payload.index, data: response.data })
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
        },
        GET_OFFICIALS: async (context) => {
            let { data } = await axios.get('landing/officials')
            context.commit('SET_OFFICIALS', data)
        },
        SAVE_OFFICIAL: async (context, payload) => {
            let { data } = await axios.post('landing/officials', payload)
            context.commit('ADD_OFFICIAL', data)
        },
        EDIT_OFFICIAL: async (context, payload) => {
            let { data } = await axios.put('landing/officials/' + payload.data.id, payload.data)
            context.commit('UPDATE_OFFICIAL', { index: payload.index, data: data })
        },
        DELETE_OFFICIAL: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.delete('landing/officials/' + payload.data.id).then(response => {
                    if (response.data.status === 1000) {
                        context.commit('DELETE_OFFICIAL', { index: payload.index, data: response.data })
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