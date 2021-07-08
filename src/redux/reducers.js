import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import auth from 'redux/modules/auth';
import post from 'redux/modules/post';
import order from 'redux/modules/order';
import cart from 'redux/modules/cart';
import dashboard from 'redux/modules/dashboard';


export default function createReducer(injectedReducer = {}){
    const rootReducer = combineReducers({
        auth: auth.getReducer(),
        post: post.getReducer(),
        order: order.getReducer(),
        cart: cart.getReducer(),
        dashboard: dashboard.getReducer(),
        ...injectedReducer
    });
    const mergeWithRouterState = connectRouter(history);
    return mergeWithRouterState(rootReducer);
}