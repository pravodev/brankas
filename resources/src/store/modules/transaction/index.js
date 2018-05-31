import actions from './TransactionActions';
import getters from './TransactionGetters';
import mutations from './TransactionMutations';
import { resource } from '../../../utils/api';
import { formatDate } from '../../../utils/date';

const state = {
    input: {
        amount: 0,
        note: '',
        date: formatDate({
            date: new Date(),
            format: 'Y-m-d'
        })
    },
    list: {...resource},
    create: {...resource},
    selected: {}
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
