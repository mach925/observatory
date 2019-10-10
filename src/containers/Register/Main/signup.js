import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { SignUpContainer, SignUpCloseButtonView } from '../../../styles/signup';
import { Text, SBView } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { IconButton, CustomButton, CustomInput } from '../../../components';
import { questionActions } from '../../../redux/actions';

const styles = {
  inputView: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottom: '1px solid ' + Colors.green
  }
};

class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      password: '',
    }
  }

  onSignUp = () => {
    const { questions: { initial }} = this.props;
    const { password } = this.state;
    this.setState({loading: true});
    this.props.signup({
      name: initial.name + ' ' + initial.surname,
      email: initial.email,
      password
    }, (res) => {
      console.log(res)
      if(res === 'success'){
        this.setState({loading: false});
        this.props.onCompleteSignUp();
      }
    })
  }

  render() {
    const { loading, password } = this.state;
    const { classes } = this.props;
    return(
      <SignUpContainer>
        <Grid container justify="center">
          <Grid item xs={11} md={6} lg={4}>
            <Text fontSize={40} color={Colors.lightgray} padding="10px 0">
                Sign up now to get full access to the results
            </Text>
            <Text fontSize={16} color={Colors.lightgray} padding="10px 0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </Text>
            <SBView className={classes.inputView}>
              <Text fontSize={12} color={Colors.lightgray} padding="0px 50px 0 0">PASSWORD</Text>
              <CustomInput
                value={password}
                type="password"
                onChange={(e) => this.setState({password: e.target.value})}
              />
            </SBView>
            <Grid container justify="flex-end">
              <CustomButton
                text={'CREATE ACCOUNT'}
                backgroundColor={Colors.lightgray}
                color={Colors.gray}
                onPress={() => this.onSignUp()}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
        <SignUpCloseButtonView>
          <IconButton
            icon="close"
            size={24}
            backgroundColor='transparent'
            color={Colors.lightgray}
            onPress={() => this.props.onCancel()}
          />
        </SignUpCloseButtonView>
      </SignUpContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  screenHeight: state.screenReducer.height,
  questions: state.questionReducer
});

const mapDispatchToProps = ({
  signup: questionActions.signup
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignUpScreen));
