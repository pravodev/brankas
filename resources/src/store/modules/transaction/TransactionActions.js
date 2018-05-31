import { SELECT_LIST, CREATE_TRANSACTION, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAILED, FETCH_TRANSACTION, FETCH_TRANSACTION_SUCCESS, FETCH_TRANSACTION_FAILED, FETCH_TRANSACTION_REFRESH } from "./TransactionTypes";
import api from "../../../utils/api";
import endpoint from "../../../utils/endpoint";
import rupiah from "../../../utils/currency";
import { FETCH_GOAL_REFRESH } from "../goal/GoalTypes";

export default {
    selectList(context, data){
        context.commit(SELECT_LIST, { data })
    },
    fetchIndex(context){
        api.getResource(endpoint.transaction, {
            onRequest: () => context.commit(FETCH_TRANSACTION),
            onSuccess: data => {
                context.commit(FETCH_TRANSACTION_SUCCESS, {data})
            },
            onFailed: error => context.commit(FETCH_TRANSACTION_FAILED, {error})
        })
    },
    store(context, type){
        let data = _.assign(this.getters['transaction/data'], {type});
        api.postResource(endpoint.transaction, data, {
            onRequest: () => context.commit(CREATE_TRANSACTION),
            onSuccess: data => {
                let getType = [
                    'income',
                    'expenditure'
                ];

                context.commit(CREATE_TRANSACTION_SUCCESS, {data})
                this._vm.$snotify.success(`Add ${getType[type]}: ${rupiah(Number(data.amount))} success!`)
            },
            onFailed: error => {
                console.log('error: ', error);
                console.log('error: ', _.get(error, 'response'));
                context.commit(CREATE_TRANSACTION_FAILED, {error})
                this._vm.$snotify.error('Error when adding transaction !');
            }
        })
    }
}
