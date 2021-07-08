import axios from './index';

export async function posts(data){
    return axios.post('post/create',data);
}

export async function getPosts(data){
    return axios.get(`post/list/${data.filter}`, {
        params: {
            search: data.search
        }
    })
}

export async function getDeatils(data){
    return axios.get(`post/details/${data.postId}`)
}

export async function getProviderPosts(data){
    return axios.get(`post/provider/list/`, {
        params: {
            search: data.search
        }
    });
}

export async function getChefPosts(data){
    return axios.get(`post/chef/list/${data.pageNumber}/${data.pageSize}`, {
        params: {
            search: data.search
        }
    });
}

export async function editChefPost(data){
    return axios.put(`post/chef/update`, data);
}

export async function deleteChefPost(data){
    return axios.delete(`post/chef/delete/${data.postId}`);
}
