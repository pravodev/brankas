import { SELECT_LIST, CREATE_TRANSACTION, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAILED, FETCH_TRANSACTION, FETCH_TRANSACTION_SUCCESS, FETCH_TRANSACTION_FAILED } from "./TransactionTypes";
import { formatDate } from '../../../utils/date';

export default {
    [SELECT_LIST](state, {data}){
        state.selected = data;
    },
    [CREATE_TRANSACTION](state){
        state.create.request = true;
        state.list.refresh = false;
    },
    [CREATE_TRANSACTION_SUCCESS](state, {data}){
        state.create.request = false;
        state.create.data = data;
        state.list.refresh = true;
        state.input.amount =  0,
        state.input.note = '',
        state.input.date = formatDate({
            date: new Date(),
            format: 'Y-m-d'
        })
    },
    [CREATE_TRANSACTION_FAILED](state, {error}){
        state.create.request = false;
        state.create.error = error;
    },
    [FETCH_TRANSACTION](state){
        state.list.request = true;
    },
    [FETCH_TRANSACTION_SUCCESS](state, {data}){
        state.list.request = false;
        state.list.data = data;
    },
    [FETCH_TRANSACTION_FAILED](state, {error}){
        state.list.request = false;
        state.list.error = error;
    }
}
