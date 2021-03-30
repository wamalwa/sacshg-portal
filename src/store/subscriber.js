import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
    switch(mutation.type) {
        case 'user/SET_AUTH_USER':
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload.accessToken}`
                localStorage.setItem('accessToken', mutation.payload.accessToken)
                localStorage.setItem('refreshToken', mutation.payload.refreshToken)
                localStorage.setItem('user', JSON.stringify({ name: mutation.payload.name, type: mutation.payload.type }))
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
            }
            break;
        case 'user/SET_REFRESH_TOKEN':
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload.accessToken}`
                localStorage.setItem('refreshToken', mutation.payload.refreshToken)
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('refreshToken')
            }
            break;
    }
})