import * as CartAPI from '../api/cart';
import ReducerFactory from '../../utils/reducerFactory';
import toastr from 'toastr';

const reducerName = 'cart';

const initialState = {
    loading: false,
    cart: {},
    chefCart: {},
    total: 0,
    cartList: [],
    error: null
}

const reducerFactory = new ReducerFactory(reducerName, initialState);
reducerFactory.addAction('CART_LOADING', `${reducerName}Loading`,
    (status) => status, (state, action) => {
        const newState = Object.assign({}, state);
        newState.loading = action.data;
        return newState;
    }
);

reducerFactory.addAction('ADD_TO_CART', 'addToCart', 
    async (data)=>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await CartAPI.addToCart(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            toastr.success(action.data.message);
            newState.cart = action.data.data
        }else{
            toastr.warning(action.data.message);
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('FETCH_CART', 'fetchCart', 
    async (data)=>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await CartAPI.fetchCart(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.cart = action.data.data
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('REMOVE_ITEM', 'removeItem', 
    async (data)=>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await CartAPI.removeItem(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.cart = action.data.data
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('CLEAR_CART', 'clearCart', 
    async (data)=>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await CartAPI.clearCart(data);
        return response.data;
    }, (state, action)=>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.cart = action.data.data
        }
        newState.loading = false;
        return newState;
    }
);

export default reducerFactory;
