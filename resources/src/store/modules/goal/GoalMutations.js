import { CREATE_GOAL, CREATE_GOAL_SUCCESS, CREATE_GOAL_FAILED, FETCH_GOAL, FETCH_GOAL_SUCCESS, FETCH_GOAL_FAILED, DELETE_GOAL, DELETE_GOAL_SUCCESS, DELETE_GOAL_FAILED, FETCH_GOAL_REFRESH } from "./GoalTypes";
import { INITIAL_STATE } from ".";


export default {
    [CREATE_GOAL](state){
        state.create.request = true;
    },
    [CREATE_GOAL_SUCCESS](state, {data}){
        console.log('data: ', data);
        console.log('state: ', state);
        state.create.request = false;
        state.create.data = data;
        state.input.title = '';
        state.input.cost = 0;
        state.input.description = '';
        state.input.image = '';
        state.input.start_date = null;
        state.input.end_date = null;
        state.input.amount_to_save = 0;
        state.input.pick_schedule = null;
    },
    [CREATE_GOAL_FAILED](state, {error}){
        state.create.request = false;
        state.create.error = error;
    },
    [FETCH_GOAL](state){
        state.list.request = true;
        state.list.refresh = false;
    },
    [FETCH_GOAL_SUCCESS](state, {data}){
        state.list.request = false;
        state.list.data = data;
        state.list.error = false;
    },
    [FETCH_GOAL_REFRESH](state){
        state.list.refresh = true;
    },
    [FETCH_GOAL_FAILED](state, {error}){
        stete.list.request = false;
        state.list.error = error;
    },
    [DELETE_GOAL](state){
        state.delete.request = true;
    },
    [DELETE_GOAL_SUCCESS](state){
        state.delete.request = false;
    },
    [DELETE_GOAL_FAILED](state, {error}){
        state.delete.request = false;
        state.delete.error = error;
    }
}
