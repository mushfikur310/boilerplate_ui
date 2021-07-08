import * as OrderAPI from '../api/order';
import ReducerFactory from '../../utils/reducerFactory';
import toastr from 'toastr';

const reducerName = 'order';

const initialState = {
    loading: false,
    order: {},
    total: 0,
    orderList: [],
    chefOrders: [],
    error: null
}

const reducerFactory = new ReducerFactory(reducerName, initialState);
reducerFactory.addAction('ORDER_LOADING', `${reducerName}Loading`,
    (status) => status, (state, action) => {
        const newState = Object.assign({}, state);
        newState.loading = action.data;
        return newState;
    }
);

reducerFactory.addAction('CREATE_ORDER', 'createOrder', 
    async (data)=>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await OrderAPI.createOrder(data);
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

reducerFactory.addAction('FETCH_CHEF_ORDER', 'fetchChefOrder',
    async (data) => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await OrderAPI.fetchChefOrders(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.chefOrders = action.data.data.chefOrders;
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('FETCH_ORDER', 'fetchOrder',
    async () => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await OrderAPI.fetchOrders();
        return response.data;
    }, (state, action) => {
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.orderList = action.data.data.orders;
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('ORDER_STATUS_CHANGE', 'orderStatusChange',
    async (data) => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await OrderAPI.orderStatusChange(data);
        return response.data;
    }, (state,action) => {
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

export default reducerFactory;
