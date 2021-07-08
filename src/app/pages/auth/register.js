import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

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

class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cardAnimaton: 'cardHidden',
      name: 'Mushfikur',
      email: 'music@gmail.com',
      password: 'Khan@123',
      userType: 'admin'
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
    const { name, email, password, userType} = this.state;
    const { authReducer } = this.props;
    if(!name){
      toastr.warning("Name is required")
    }
    if(!email || emailVal(email)){
      toastr.warning("Invalid email Id");
      return;
    }
    if(!password || password.length < 6){
      toastr.warning("Password must contain atleast 6 characters");
      return;
    }
    const reqObj = {name, email, password, role: userType}
    authReducer.register(reqObj).then(res=>{
      if(res && res.success){
        this.props.history.push("/login");
      }
    });
  }

  render(){
    const { classes } = this.props;
    const { cardAnimaton, name, email, password, userType } = this.state;
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
                      labelText="Name"
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value: name,
                        onChange: (e)=>this.handleChange(e,'name'),
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
                      Register
                    </Button>
                  </CardFooter>
                </form>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ marginTop: '20px' }}>
                    Already have an account? 
                  </p>
                  <div style={{ margin: '20px 0' }}>
                    <Button variant="outlined" color="default" onClick={() => this.props.history.push("/login")}>
                      Login
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

const RegisterContainer = connect(
  state => ({
    error: state.get('auth').error,
    loading: state.get('auth').loading
  }),
  dispatch => ({
    authReducer: authReducer.getActions(dispatch)
  })
)(Register)

export default withStyles(styles)(RegisterContainer);