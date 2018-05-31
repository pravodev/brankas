import _ from 'lodash';
// import { Deserializer, Serializer } from 'jsonapi-serializer'

// const deserializer = new Deserializer({ keyForAttribute: 'snake_case' });
const Axios = window.axios;

// export const serializeNewData = (type, data) => {
//     return {
//         data: {
//             type,
//             attributes: data
//         }
//     }
// }

const defaultRequestConf = {
    // headers: {
    // 'Content-Type': 'application/vnd.api+json',
    // 'Accept': 'application/vnd.api+json',
    // }
}

export const resource = {
    request: false,
    data: [],
    error: false,
    refresh: false
}

export default {
    getResource(url, actions){
        let config = {
            url,
            method: 'get'
        }

        this.requestResource(config, actions);
    },
    postResource(url, data, actions){
        let config = {
            url,
            method: 'post',
            data
        }
        this.requestResource(config, actions);
    },
    deleteResource(url, actions){
        let config = {
            url, method: 'delete'
        }
        this.requestResource(config, actions);
    },
    requestResource(config, userActions){
        let source = null;
        let axiosReqConf = { ...defaultRequestConf, ...config }
        let actions = _.merge({
            onRequest: (payload) => {},
            onSuccess: (payload) => {},
            onFailed: (payload) => {}
        }, userActions);

        actions.onRequest(source);

        Axios.request(axiosReqConf)
        .then((response) => {
            if(_.has(actions, 'onResponded')){
                actions.onResponded(response);
            }
            actions.onSuccess(response.data.data);
            // deserializer.deserialize(response.data)
            // .then((result) => actions.onSuccess(result))
            // .catch((error) => actions.onFailed(error))
        }).catch(error => {
            actions.onFailed(error, _.get(error, 'response.data'));
        })
    }
}

