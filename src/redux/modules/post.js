import * as PostApi from '../api/post';
import ReducerFactory from '../../utils/reducerFactory';

import toastr from 'toastr';
const reducerName = 'post';

const initialState = {
    loading: false,
    post: {},
    providerPosts: [],
    providerPostsTotal: 0,
    total: 0,
    postList: [],
    chefPosts: [],
    chefTotalPosts: 0,
    error: null
}

const reducerFactory = new ReducerFactory(reducerName, initialState);
reducerFactory.addAction('POST_LOADING', `${reducerName}Loading`,
    (status) => status, (state, action) => {
        const newState = Object.assign({}, state);
        newState.loading = action.data;
        return newState;
    }
);

reducerFactory.addAction('CREATE_POST', 'createPost', 
    async (data)=>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await PostApi.posts(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            toastr.success(action.data.message);
        }else{
            toastr.warning(action.data.message);
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('GET_POST', 'getPosts',
    async (data)=> {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await PostApi.getPosts(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.postList = action.data.data.posts;
            newState.total = action.data.data.total
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('GET_DETAILS', 'getDetails',
    async (data)=> {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await PostApi.getDeatils(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.post= action.data.data.post;
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('FETCH_PROVIDER_POST', 'getProviderPosts', 
    async (data)=>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await PostApi.getProviderPosts(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.providerPosts = action.data.data.providerPosts;
            newState.providerPostsTotal = action.data.data.providerPostsTotal
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('FETCH_CHEF_POST', 'getChefPosts',
    async (data) => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await PostApi.getChefPosts(data);
        return response.data;
    }, (state, action) => {
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.chefPosts = action.data.data.chefPosts;
            newState.chefTotalPosts = action.data.data.totalChefPosts;
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('EDIT_CHEF_POST', 'editChefPost',
    async (data) => {
        console.log(data);
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await PostApi.editChefPost(data);
        return response.data;
    }, (state, action) => {
        const newState = Object.assign({}, state);
        action.data.success ? toastr.success(action.data.message) : toastr.warning(action.data.message);
        newState.loading = false;
        return newState;
    }
);
 reducerFactory.addAction('DELETE_CHEF_POST', 'deleteChefPost',
    async (data) => {
        console.log(data);
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await PostApi.deleteChefPost(data);
        return response.data;
    }, (state, action) => {
        const newState = Object.assign({}, state);
        action && action.data && action.data.success ? toastr.success(action.data.message) : toastr.warning(action.data.message);
        newState.loading = false;
        return newState;
    }
)

export default reducerFactory;

