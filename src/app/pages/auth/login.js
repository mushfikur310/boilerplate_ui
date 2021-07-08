import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";

import GridContainer from "app/components/grids/gridContainer";
import GridItem from "app/components/grids/gridItem";
import Card from "app/components/cards/card";
import CardBody from "app/components/cards/cardBody";
import CardFooter from "app/components/cards/cardFooter";
import CustomInput from "app/components/inputs/input";

import styles from "test_ui_kit/jss/material-kit-react/views/loginPage";


import authReducer from "redux/modules/auth";
import toastr from 'toastr';
import { connect } from "react-redux";

const emailVal = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cardAnimaton: 'cardHidden',
      email: '',
      password: ''
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({ cardAnimaton: ''})
    },200)
  }

  handleChange = (e,fieldName) => {
    this.setState({ [fieldName] : e.target.value });
  }

  handleSubmit = () =>{
    const { email, password} = this.state;
    const { authReducer } = this.props;
    if(!email || emailVal(email)){
      toastr.warning("Invalid email Id");
      return;
    }
    if(!password || password.length < 6){
      toastr.warning("Password must contain atleast 6 characters");
      return;
    }
    const reqObj = {email, password }
    authReducer.login(reqObj).then(res=>{
      if(res && res.success){
        this.props.history.push("/");
      }
    });
  }




  render(){
    const { classes } = this.props;
    const { cardAnimaton, email, password } = this.state;
    return(
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
            <div>
              <Button variant="outlined" color="secondary" onClick={() => this.props.history.push("/")}>Home</Button>
            </div>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardBody>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        value: email,
                        onChange: (e)=>this.handleChange(e,'email'),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: password,
                        onChange: (e) => this.handleChange(e,'password'),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
                      Login
                    </Button>
                  </CardFooter>
                </form>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginTop: '20px' }}>
                    Create new account
                  </p>
                  <div style={{ marginTop: '20px' }}>
                    <Button variant="outlined" color="default" onClick={() => this.props.history.push("/register")}>
                      Sign Up
                    </Button>
                  </div>
                  <div style={{ margin: '20px 0' }}>
                    <Button variant="outlined" color="default" onClick={() => this.props.history.push("/forgot-password")}>
                      Forgot Password
                    </Button>
                  </div>
                </div>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    )
  }
}

const LoginContainer = connect(
  state => ({
    error: state.get('auth').error,
    loading: state.get('auth').loading
  }),
  dispatch => ({
    authReducer: authReducer.getActions(dispatch)
  })
)(Login)

export default withStyles(styles)(LoginContainer);