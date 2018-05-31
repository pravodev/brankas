import Vue from 'vue';
import router from './router';
import './bootstrap';
import store from './store';

// console.log('adasd: ', $('#brankas')[0]);
if($('#brankas')[0]){
    let app = new Vue({
        router,
        store,
        csrf: window.csrf
    }).$mount('#brankas');
}else{
    let app = new Vue().$mount('#login__wrapper');
}

