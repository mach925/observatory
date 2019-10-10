import * as React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import qs from 'query-string';
import AdminSideView from './sideview';
import { screenActions } from '../../redux/actions';
import SurveyAdminLogin from './login';
import SurveyDashboard from './dashboard';
import SurveyQuestionnaire from './questionnaire';
import SurveySearchCompany from './search_company';
import SurveyDetail from './survey_detail';
import { MainContainer, Content, RightView, TopBar } from '../../styles/admin_survey';
import { FlexView, SText } from '../../styles/global';
import { IconButton } from '../../components';
import { Colors } from '../../lib/theme';

class AdminSurvey extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      redirect: 'dashboard'
    }    
  }

  componentDidMount() {
    const menu = this.props.match.params.menu; 
    if(menu === 'dashboard') this.setState({index: 1});
    else if(menu === 'questionnaire') this.setState({index: 2});
    else if(menu === 'search') this.setState({index: 3});
    else if(menu === 'detail'){
      this.setState({index: 4, surveyIndex: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id});
    } else if(menu === 'login') {
      const redirect = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).redirect;
      this.setState({index: 0, });
      if(redirect !== undefined) this.setState({redirect});
    }
    else this.setState({index: -1});
  }

  onChangeIndex = (index, category) => {
    this.setState({index});
    this.props.history.push('/admin/survey/' + category);
  }

  onRedirect = () => {
    const { redirect } = this.state;
    console.log('redirect', redirect);
    if(redirect === 'dashboard') this.onChangeIndex(1, 'dashboard');
    else if(redirect === 'questionnaire') this.onChangeIndex(2, 'questionnaire');
    else if(redirect === 'search' || redirect === 'detail') this.onChangeIndex(3, 'search');
    else this.onChangeIndex(1, 'dashboard');
  }

  redirectToLogin = (redirect) => {
    this.setState({index: 0, redirect});
    this.props.history.push('/admin/survey/login?redirect=' + redirect);
  }

  render() {
    const { index, surveyIndex } = this.state;
    const { screenWidth, visibleSideBar } = this.props;
    return(
      <MainContainer>
        <AdminSideView
          visible={visibleSideBar} 
          index={index}
          onChangeIndex={this.onChangeIndex}
          hideSideView={() => this.props.setVisibleSideBar(false)}
        />
        <RightView screenWidth={screenWidth} visibleSideBar={visibleSideBar}>
          <TopBar>
            <FlexView justify="flex-end" padding="10px 0">
              <SText>Admin</SText>
              <IconButton 
                icon="list"
                backgroundColor="transparent"
                color={Colors.gray} 
                onPress={() => this.props.setVisibleSideBar(!visibleSideBar)} 
                margin={10}
              />
            </FlexView>
          </TopBar>
          <Content screenWidth={screenWidth}>
            {index === 0 && 
              <SurveyAdminLogin 
                redirect={this.onRedirect}
              />
            }
            {index === 1 && 
              <SurveyDashboard 
                redirectToLogin={() => this.redirectToLogin('dashboard')} 
              />
            }
            {index === 2 && 
              <SurveyQuestionnaire 
                redirectToLogin={() => this.redirectToLogin('questionnaire')} 
              />
            }
            {index === 3 && 
              <SurveySearchCompany 
                redirectToLogin={() => this.redirectToLogin('search')} 
              />
            }
            {index === 4 && 
              <SurveyDetail 
                id={surveyIndex} 
                redirectToLogin={() => this.redirectToLogin('detail')} 
              />
            }
          </Content>
        </RightView>
      </MainContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
  visibleSideBar: state.screenReducer.visibleSideBar,
});

const mapDispatchToProps = ({
  setVisibleSideBar: screenActions.setVisibleSideBar,
})

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AdminSurvey));
