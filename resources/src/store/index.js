import Vuex from 'vuex';
import goal from './modules/goal';
import transaction from './modules/transaction';

export default new Vuex.Store({
    modules: {
        goal,
        transaction
    }
})
