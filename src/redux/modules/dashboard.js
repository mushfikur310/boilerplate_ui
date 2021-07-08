import * as DashboardApi from '../api/dashboard';
import ReducerFactory from '../../utils/reducerFactory';
import config from 'appConfig';
import toastr from 'toastr';

const reducerName = 'dashboard';

const initialState = {
    loading: false,
    totalPosts:0,
    totalOrders: 0,
    totalTransactions: 0,
    totalRevenue:0,
    orderData: {
        labels: config.monthNames,
		series: [[0,0,0,0,0,0,0,0,0,0,0,0]]
    },
    error: null
}

const reducerFactory = new ReducerFactory(reducerName, initialState);
reducerFactory.addAction('DASHBOARD_LOADING', `${reducerName}Loading`,
    (status) => status, (state, action) => {
        const newState = Object.assign({}, state);
        newState.loading = action.data;
        return newState;
    }
);

reducerFactory.addAction('DASHBOARD_COUNT', 'dashboardCount',
    async () => {
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await DashboardApi.fetchCount();
        return response.data;
    }, (state,action) => {
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.totalPosts = action.data.data.totalPosts;
            newState.totalOrders = action.data.data.totalOrders;
            newState.totalRevenue = action.data.data.totalRevenue;
            newState.totalTransactions = action.data.data.totalTransactions;
        }
        newState.loading = false;
        return newState;
    }
);

reducerFactory.addAction('DASHBOARD_ORDER', 'dashboardOrder',
    async () =>{
        reducerFactory.action(`${reducerName}Loading`, true);
        const response = await DashboardApi.orderData();
        return response.data;
    }, (state, action) =>{
        const newState = Object.assign({}, state);
        if(action.data.success){
            newState.orderData = action.data.data.orderData
        }
        newState.loading = false;
        return newState;
    }
)

export default reducerFactory;