import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import AuthReducer from './redux/modules/auth';
import CartReducer from './redux/modules/cart';

import Login from 'app/pages/auth/login';
import Register from 'app/pages/auth/register';
import VerifyOTP from 'app/pages/auth/verifyOtp';
import ResertPassword from 'app/pages/auth/resetPassword';
import ForgotPassword from 'app/pages/auth/forgotPassword';

import Home from 'app/home/home';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
        this.props = nextProps;
    }
  }

  componentWillMount(){
    const { authReducer, cartReducer } = this.props;
    authReducer.checkAuth();
    let accessSecret = window.localStorage.getItem('casserole_auth');
    if(accessSecret){
      cartReducer.fetchCart();
    }
  }

  render(){
    return(
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/verify-otp" component={VerifyOTP} />
          <Route exact path="/reset-password" component={ResertPassword} />
          <Redirect to="/" /> 
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired
}
const AppContainer = connect(
  state => ({
      user: state.get('auth').user
  }),
  dispatch => ({
      authReducer: AuthReducer.getActions(dispatch),
      cartReducer: CartReducer.getActions(dispatch)
  })
)(App);

export default AppContainer;
