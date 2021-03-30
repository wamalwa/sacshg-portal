import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdi',
        theme: {
            themes: {
                light: {
                    primary: '#ff0000',
                }
            }
        }
    },
})

export default vuetify