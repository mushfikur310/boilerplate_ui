import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Button from "@material-ui/core/Button";
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';

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

class VerifyOTP extends React.Component{
  constructor(props){
    super(props);
    this.state={
      cardAnimaton: 'cardHidden',
      otp: ""
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
    const { otp } = this.state;
    const { authReducer } = this.props;
    if(!otp || otp.length !== 4){
      toastr.warning("OTP must be 4 digit number");
      return;
    }
    const reqObj = { otp };
    authReducer.verifyOtp(reqObj).then(res=>{
      if(res && res.success){
        this.props.history.push("/reset-password");
      }
    });
  }

  render(){
    const { classes } = this.props;
    const { cardAnimaton, otp } = this.state;
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
                      labelText="OTP"
                      id="otp"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        value: otp,
                        onChange: (e)=>this.handleChange(e,'otp'),
                        endAdornment: (
                          <InputAdornment position="end">
                            <FormatListNumberedRtlIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
                      Verify OTP
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

const VerifyOTPContainer = connect(
  state => ({
    error: state.get('auth').error,
    loading: state.get('auth').loading
  }),
  dispatch => ({
    authReducer: authReducer.getActions(dispatch)
  })
)(VerifyOTP)

export default withStyles(styles)(VerifyOTPContainer);