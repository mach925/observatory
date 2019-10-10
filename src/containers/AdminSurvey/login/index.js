import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import qs from 'query-string';
import { surveyActions } from '../../../redux/actions';
import { GrayMText, BlueLText } from '../../../styles/global';
import { CustomInput, CustomButton } from '../../../components';
import { validateEmail } from '../../../lib/operators';
import { RightView } from '../../../styles/admin_survey';
import { Colors } from '../../../lib/theme';

const styles = {
  title: {
    marginTop: 100
  }
}

class SurveyAdminLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {},
      redirect: 'dashboard',
      loading: false
    }
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onBlurInput = () => {
    this.checkInputValues();
  }

  checkInputValues = () => {
    const { email, password } = this.state;
    let error = {};
    if(!validateEmail(email)) {
      error.email = 'Email is invalid';
    }
    if(password.length === 0) {
      error.password = 'Password is required';
    }
    this.setState({error}); 
    if(Object.keys(error).length === 0) return true;
    else return false;
  }

  onSubmit = () => {
    const { email, password } = this.state;
    if(this.checkInputValues()) {
      // login API
      this.setState({loading: true});
      this.props.loginSurveyAdmin({ email, password }, (res) => {
        setTimeout(() => {
          this.setState({loading: false});
          if(res === 'success') {
            this.props.enqueueSnackbar('Welcome to admin survey page!', {variant: 'success'})
            this.props.redirect();
          } else {
            this.props.enqueueSnackbar(res, {variant: 'error'})
          }
        }, 2000);        
      })
    }
  }

  render() {
    const { email, password, error, loading } = this.state;
    return(
      <Grid container justify="center">
        <Grid item xs={10} md={4}>
          <Grid container className={this.props.classes.title}>
            <BlueLText>Login</BlueLText>
          </Grid>
          {/* <Grid container>
            <GrayMText>Email</GrayMText>
          </Grid> */}
          <Grid container>
            <CustomInput
              label={'EMAIL'}
              value={email}
              error={error.email}
              onChange={this.handleInputChange('email')}
              onBlur={this.onBlurInput}
            />
          </Grid>
          <Grid container>
            <CustomInput
              label={'PASSWORD'}
              value={password}
              error={error.password}
              onChange={this.handleInputChange('password')}
              onBlur={this.onBlurInput}
            />
          </Grid>
          <RightView>
            <CustomButton
              text={'Log In'}
              backgroundColor={Colors.blue}
              onPress={this.onSubmit}
              loading={loading}
            />
          </RightView>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
});

const mapDispatchToProps = ({
  loginSurveyAdmin: surveyActions.loginSurveyAdmin
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SurveyAdminLogin)));
