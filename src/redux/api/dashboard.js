import axios from './index';

export async function fetchCount(){
    return axios.get('dashboard/count');
}

export async function orderData(){
    return axios.get('dashboard/order');
}