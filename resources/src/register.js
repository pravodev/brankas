import Vue from 'vue';
import VueRouter from 'vue-router';
import feather from 'vue-icon';
import BootstrapVue from 'bootstrap-vue';
import Vuex from 'vuex';
import VueMask from 'v-mask';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import vMediaQuery from 'v-media-query';

const SnotifyOption = {
    toast: {
        position: SnotifyPosition.rightTop
    }
};

const plugins = [
    {src: VueRouter},
    {src: feather},
    {src: BootstrapVue},
    {src: Vuex},
    {src: VueMask},
    {src: Snotify, option: SnotifyOption},
    {src: vMediaQuery}
];

const components = [
    {name: 'modal-create-goal',             src: require('./components/CreateGoalComponent.vue')},
    {name: 'modal-create-transaction',      src: require('./components/CreateTransactionComponent.vue')},
    {name: 'clip-loader',                   src: require('vue-spinner/src/ClipLoader.vue')},
    {name: 'navigation',                    src: require('./components/NavigationComponent')},
    {name: 'navbar-menu',                   src: require('./components/NavbarMenuComponent')},
    {name: 'transaction-record',            src: require('./components/TransactionRecordComponent.vue')}
]
// plugins
plugins.forEach(({src, option}) => Vue.use(src, option));
//components
components.forEach(({name, src}) => Vue.component(name, src));
