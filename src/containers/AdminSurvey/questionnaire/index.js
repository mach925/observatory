import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  
}

class SurveyQuestionnaire extends React.Component {

  componentDidMount() {
    if(!this.props.loggedIn){
      this.props.redirectToLogin();
    }
  }

  render() {
    return(
      <p>Questionnaire</p>
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
  loggedIn: state.surveyReducer.loggedIn
});

const mapDispatchToProps = ({

})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SurveyQuestionnaire));
