import VueRouter from 'vue-router';

export default new VueRouter({
    routes: [
        { path: '/', component: require('./containers/Home.vue') },
        { path: '/home', component: require('./containers/Home.vue') },
        { path: '/setting', component: require('./containers/Setting.vue') },
        { path: '/records', component: require('./containers/Record.vue') },
    ],
    mode: 'history'
})
