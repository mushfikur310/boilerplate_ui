import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import NoEncryptionIcon from '@material-ui/icons/NoEncryption';
// @material-ui/icons
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

class ResetPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cardAnimaton: 'cardHidden',
      password: "",
      confirmedPassword: ""
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({ cardAnimaton: ''})
    },200)
  }

  handleChange = (e,fielName) => {
    this.setState({ [fielName] : e.target.value });
  }

  handleSubmit = () =>{
    const { password, confirmedPassword } = this.state;
    const { authReducer } = this.props;
    if(!password || password.length < 6){
      toastr.warning("Password must contain atleast 6 characters");
      return;
    }
    if(!confirmedPassword || confirmedPassword.length < 6){
        toastr.warning("Password must contain atleast 6 characters");
        return;
    }
    if(password !== confirmedPassword){
        toastr.warning("Password doesn't match");
        return;
    }
    const reqObj = { password }
    authReducer.resetPassword(reqObj).then(res=>{
      if(res && res.success){
        window.localStorage.clear();
        this.props.history.push("/login");
      }
    });
  }

  render(){
    const { classes } = this.props;
    const { cardAnimaton, password, confirmedPassword  } = this.state;
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
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: password,
                        onChange: (e)=>this.handleChange(e,'password'),
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
                    <CustomInput
                      labelText="Confirm Password"
                      id="pass1"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value: confirmedPassword,
                        onChange: (e)=>this.handleChange(e,'confirmedPassword'),
                        endAdornment: (
                          <InputAdornment position="end">
                            <NoEncryptionIcon className={classes.inputIconsColor}/>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
                      Reset Password
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    )
  }
}
const ResetPasswordContainer = connect(
  state => ({
    error: state.get('auth').error,
    loading: state.get('auth').loading
  }),
  dispatch => ({
    authReducer: authReducer.getActions(dispatch)
  })
)(ResetPassword)
export default withStyles(styles)(ResetPasswordContainer);