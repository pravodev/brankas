import api from '../../../utils/api';
import endpoint from '../../../utils/endpoint';
import { CREATE_GOAL, CREATE_GOAL_SUCCESS, CREATE_GOAL_FAILED, FETCH_GOAL, FETCH_GOAL_SUCCESS, FETCH_GOAL_FAILED, FETCHSHOW_GOAL, FETCHSHOW_GOAL_SUCCESS, FETCHSHOW_GOAL_FAILED, DELETE_GOAL, DELETE_GOAL_SUCCESS, DELETE_GOAL_FAILED, FETCH_GOAL_REFRESH } from './GoalTypes';
import Snotify from 'vue-snotify'

export default {
    store(context, data){
        api.postResource(endpoint.goal, data, {
            onRequest: () => context.commit(CREATE_GOAL),
            onSuccess: data => {
                context.commit(CREATE_GOAL_SUCCESS, { data })
                context.commit(FETCH_GOAL_REFRESH);
                this._vm.$snotify.success('Goal: ' + data.title + ' created');
            },
            onFailed: (error, data) => {
                context.commit(CREATE_GOAL_FAILED, { error })
                if(_.isEmpty(data.error_description) === false){
                    _.map(data.error_description, (list, title) => _.map(list, description => this._vm.$snotify.warning(description)))
                }
            }
        })
    },
    fetchIndex(context){
        api.getResource(endpoint.goal, {
            onRequest: () => context.commit(FETCH_GOAL),
            onSuccess: data => context.commit(FETCH_GOAL_SUCCESS, { data }),
            onFailed: error => {
                context.commit(FETCH_GOAL_FAILED, { error })
                this._vm.$snotify.error('Fetching Goal Data Error!');
            }
        })
    },
    fetchShow(context, id){
        api.getResource(endpoint.goal + '/' + id, {
            onRequest: () => context.commit(FETCHSHOW_GOAL),
            onSuccess: data => context.commit(FETCHSHOW_GOAL_SUCCESS, { data }),
            onFailed: error => {
                context.commit(FETCHSHOW_GOAL_FAILED, { error })
                this._vm.$snotify.error('Fetching Goal Data Error!');
            }
        })
    },
    destroy(context, data){
        this._vm.$snotify.confirm('anda akan menghapus goal: ' + data.title + ' klik Yes untuk menghapus', 'Hapus Goal ?', {
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            buttons: [
                {
                    text: 'Yes',
                    bold: false,
                    action: toast => {
                        api.deleteResource(endpoint.goal + '/' + data.id, {
                            onRequest: () => context.commit(DELETE_GOAL),
                            onSuccess: data => {
                                context.commit(DELETE_GOAL_SUCCESS, { data })
                                context.commit(FETCH_GOAL_REFRESH);
                                this._vm.$snotify.remove(toast.id);
                                this._vm.$snotify.success('Goal deleted')
                            },
                            onFailed: error => {
                                console.log('error: ', error.response);
                                context.commit(DELETE_GOAL_FAILED, {error});
                                this._vm.$snotify.remove(toast.id);
                                this._vm.$snotify.error('Error When deleting goal');
                            }
                        })
                    }
                },
                {text: 'No', action: toast => this._vm.$snotify.remove(toast.id)},
                // {text: 'Later', action: (toast) => {console.log('Clicked: Later'); this._vm.$snotify.remove(toast.id); } },
                // {text: 'Close', action: (toast) => {console.log('Clicked: No'); this._vm.$snotify.remove(toast.id); }, bold: true},
            ]
        });
    }
}
