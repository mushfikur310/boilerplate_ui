import * as AuthApi from '../api/auth';
import ReducerFactory from '../../utils/reducerFactory';

import toastr from 'toastr';
const reducerName = 'auth';

const initialState = {
    loading: false,
    user: {},
    error: null
}

const reducerFactory = new ReducerFactory(reducerName, initialState);
reducerFactory.addAction('AUTH_LOADING', `${reducerName}Loading`,
    (status) => status, (state, action) => {
        const newState = Object.assign({}, state);
        newState.loading = action.data;
        return newState;
    }
);

reducerFactory.addAction('CHECK_AUTH', 'checkAuth',
    async () => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await AuthApi.checkAuth();
        return response.data ? response.data: null;
    }, (state, action) =>{
        const newState = Object.assign({}, state);
        if(action.data && action.data.success){
            window.localStorage.setItem('casserole_auth', action.data.data.auth);
            newState.user = action.data.data.user
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('LOGIN', 'login',
    async (data) =>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await AuthApi.login(data);
        return response.data;
    }, (state, action) =>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            window.localStorage.setItem('casserole_auth', action.data.data.auth);
            newState.user = action.data.data.user;
        }else{
            toastr.error(action.data.message);
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('REGISTER', 'register',
    async (data) => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await AuthApi.register(data);
        return response.data;
    }, (state, action) =>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            window.localStorage.setItem('casserole_auth', action.data.data.auth);
            newState.user = action.data.data.user;
            toastr.success(action.data.message);
        }else{
            toastr.error(action.data.message);
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('FORGOT_PASSWORD', 'forgotPassword',
    async (data) => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await AuthApi.forgotPassword(data);
        return response.data;
    }, (state, action) => {
        const newState = Object.assign({}, state);
        if(action.data.success){
            window.localStorage.setItem('casserole_auth_reset', action.data.data.auth);
            toastr.success(action.data.message);
        }else{
            toastr.error(action.data.message);
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('VERFIY_OTP', 'verifyOtp',
    async (data) => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await AuthApi.verifyOTP(data);
        return response.data;
    }, (state, action) => {
        const newState = Object.assign({}, state);
        if(action.data.success){
            toastr.success(action.data.message);
        }else{
            toastr.error(action.data.message);
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('RESET_PASSWORD', 'resetPassword',
    async (data) => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await AuthApi.resetPassword(data);
        return response.data;
    }, (state, action) => {
        const newState = Object.assign({}, state);
        if(action.data.success){
            toastr.success(action.data.message);
        }else{
            toastr.error(action.data.message);
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('UPDATE_USER_PROFILE', 'updateUserProfile',
    async (data) => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await AuthApi.updateUserProfile(data);
        return response.data;
    }, (state,action) => {
        const newState = Object.assign({}, state);
        if(action.data.success){
            state.user = action.data.data.user;
            toastr.success(action.data.message);
        }else{
            toastr.error(action.data.message);
        }
        newState.loading = false;
        return newState;
    }
)

reducerFactory.addAction('REFRESH_USER', 'refreshUser', 
    async() => true,
    (state) =>{
        const newState = Object.assign({}, state);
        newState.user = {};
        return newState
    } 
)


export default reducerFactory;
