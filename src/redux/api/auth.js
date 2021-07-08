import axios from './index';

export async function checkAuth(){
    const authToken = window.localStorage.getItem('casserole_auth');
    if(authToken){
        return axios.get('auth/check');
    }
    return null;
}

export async function login(data){
    return axios.post('auth/login',data);
}

export async function register(data){
    return axios.post('auth/register', data);
}

export async function forgotPassword(data){
    return axios.post('auth/forgot/password', data);
}

export async function verifyOTP(data){
    return axios.post('auth/verify/otp', data);
}

export async function resetPassword(data){
    return axios.post('auth/reset/password', data);
}

export async function updateUserProfile(data){
    return axios.put('auth/user/update', data);
}