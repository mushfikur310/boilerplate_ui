import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";

import GridContainer from "app/components/grids/gridContainer";
import GridItem from "app/components/grids/gridItem";
import Card from "app/components/cards/card";
import CardBody from "app/components/cards/cardBody";
import CardFooter from "app/components/cards/cardFooter";
import CustomInput from "app/components/inputs/input";

import styles from "test_ui_kit/jss/material-kit-react/views/loginPage";

import toastr from 'toastr';
import { connect } from "react-redux";

import authReducer from "redux/modules/auth";

const emailVal = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

class ForgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cardAnimaton: 'cardHidden',
      email: ""
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
    const { email } = this.state;
    const { authReducer } = this.props;
    if(!email || emailVal(email)){
      toastr.warning("Invalid email Id");
      return;
    }
    const reqObj = { email }
    authReducer.forgotPassword(reqObj).then(res=>{
      if(res && res.success){
        this.props.history.push("/verify-otp");
      }
    });
  }

  render(){
    const { classes } = this.props;
    const { cardAnimaton, email } = this.state;
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
                      Send OTP
                    </Button>
                  </CardFooter>
                </form>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <Button variant="contained" color="default" onClick={() => this.props.history.push("/login")}>
                    <ArrowBackIcon style={{ marginRight: '5px'}} />
                    Back to Login
                  </Button>
                </div>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    )
  }
}

const ForgotPasswordContainer = connect(
  state => ({
    error: state.get('auth').error,
    loading: state.get('auth').loading
  }),
  dispatch => ({
    authReducer: authReducer.getActions(dispatch)
  })
)(ForgotPassword)

export default withStyles(styles)(ForgotPasswordContainer);