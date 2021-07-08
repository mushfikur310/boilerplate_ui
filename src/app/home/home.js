import React from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import styles from "test_ui_kit/jss/material-kit-react/views/landingPage.js";
import "app/styles/main.css";

import authReducer from 'redux/modules/auth';
import { Button } from '@material-ui/core';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      selectedDate: '',
      user: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (this.props.user !== nextProps.user) {
        this.setState({ user: nextProps.user });
      }
      this.props = nextProps;
    }
  }

  render() {

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={() => this.props.history.push("/login")}>Login / Signup</Button>
      </div>
    )
  }
}

const HomeContainer = connect(
  state => ({
    user: state.get('auth').user
  }),
  dispatch => ({
    authReducer: authReducer.getActions(dispatch)
  })
)(Home)
export default withStyles(styles)(HomeContainer);