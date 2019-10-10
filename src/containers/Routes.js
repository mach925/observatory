import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import InitialSignUp from './Register/initial';
import MainQuestionScreen from './Register/Main/main';
import {screenActions} from '../redux/actions';
import InvalidPage from './invalidpage';
import AdminSurvey from './AdminSurvey';
import SignUpSuccess from './Register/success';


class Router extends React.Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.setDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={InitialSignUp}/>
          <Route exact path="/signup/:hash_key" component={InitialSignUp}/>
          <Route exact path="/signup/:hash_key/main/:index" component={MainQuestionScreen}/>
          <Route exact path="/signup_success" component={SignUpSuccess}/>
          <Route exact path="/admin/survey/:menu" component={AdminSurvey}/>
          {/* <Route exact path="/admin/survey/detail/:id" component={AdminSurvey}/> */}
          <Route exact path="*" component={InvalidPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = ({
  setDimension: screenActions.setDimension
})

export default connect(null, mapDispatchToProps)(Router);
