import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'babel-polyfill'

import routes from './routes.js'

Vue.use(Vuetify)
Vue.use(VueRouter)

const router = new VueRouter({routes});

new Vue({
    el: '#vueApp',
    router,
    data: {
        drawer: false,
        items: [
          { icon: "compare_arrows", text: "Matches",    page: "Matches" },
          { icon: "person",         text: "Spelers",    page: "Players" },
          { icon: "group",          text: "Clubs",      page: "Clubs" }
        ],
    }
})

function registerServiceWorker(){
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('/serviceworker.js')
        .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}

registerServiceWorker()