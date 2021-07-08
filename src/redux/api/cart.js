import axios from './index';

export async function addToCart(data){
    return axios.post('cart/add', data);
}

export async function fetchCart(){
    return axios.get('cart/fetch');
}

export async function removeItem(data) {
    return axios.delete(`cart/remove/${data.postId}/${data.cartId}`);
}

export async function clearCart(data) {
    return axios.delete(`cart/clear/${data.cartId}`)
}