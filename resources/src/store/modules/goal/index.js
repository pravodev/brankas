import actions from './GoalActions';
import getters from './GoalGetters';
import mutations from './GoalMutations';
import { resource } from '../../../utils/api';

export const INITIAL_STATE = {
    create: {...resource},
    list: {...resource},
    delete: {...resource},
    input: {
        title: '',
        cost: 0,
        description: '',
        image: '',
        start_date: null,
        end_date: null,
        amount_to_save: 0,
        pick_schedule: null
    },
}
const state = INITIAL_STATE;

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
