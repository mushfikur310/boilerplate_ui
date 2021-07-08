import axios from './index';

export async function createOrder(data){
    return axios.post('order/create', data);
}

export async function fetchChefOrders(data){
    return axios.get('order/chef/get', {
        params: {
            search: data.search
        }
    })
}

export async function fetchOrders(){
    return axios.get('order/list');
}

export async function orderStatusChange(data){
    return axios.put('order/status', data);
}