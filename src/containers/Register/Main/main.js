import * as React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import LeftSideView from './sideview';
import {
  MainContainer,
  MainQuestionInputContainer,
  MainQuestionTotalProgressView,
  MainQuestionContent,
  MainQuestionFooter
} from '../../../styles/signup';
import { Colors } from '../../../lib/theme';
import { ProgressBar, IconButton, IfView, CustomButton } from '../../../components';
import { screenActions, questionActions } from '../../../redux/actions';
import CompanyStatusQuestion from './company_status';
import EconomicGrowthQuestion from './economic_growth';
import FinancingQuestion from './financing';
import IntellectualPropertyQuestion from './intellectual_property';
import EnergyChallengeQuestion from './energy_challenges';
import SignUpScreen from './signup';
import { validateQuestion } from '../../../lib/operators';

class MainQuestionScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 1,
      loading: false,
      showSignupModal: false,
    }
  }

  componentDidMount() {
    const hashKey = this.props.match.params.hash_key;
    const questionIndex = this.props.match.params.index;
    if(this.props.question.hashKey !== hashKey) this.props.resetQuestions({hashKey});
    this.props.loadAnswers(hashKey);
    this.setState({questionIndex: Number(questionIndex)});
  }

  onChangeIndex = (index) => {
    this.setState({questionIndex: index});
    this.props.history.push('/signup/' + this.props.question.hashKey + '/main/' + index);
    this.props.saveQuestions();
  }

  getAnsweredQuestions = () => {
    let count = this.getProgress('company_status');
    count += this.getProgress('economic_growth');
    count += this.getProgress('financing');
    count += this.getProgress('intellectual_property');
    return count;
  }

  getTotalQuestionNumber = () => {
    return this.props.question.total_required_question_count;
  }

  getProgress = (category) => {
    const { question } = this.props;
    let completed_count = 0;
    Object.keys(question[category]).map((key) => {
      if(category === 'financing' && key === 'percentage') return true;
      if(validateQuestion(question, category, key, false)) completed_count++;

      return true;
    })
    return completed_count;
  }

  onSubmit = () => {
    this.props.setSubmitted(true);
    setTimeout(() => {
      if(this.getAnsweredQuestions() !== this.getTotalQuestionNumber()) {
        this.props.enqueueSnackbar("You didn't answered all questions. Please check red-bordered question(s) and submit again.", {variant: 'error'})
      } else {
        this.setState({showSignupModal: true});
      }
    });
    this.props.saveQuestions();
  }

  onCompleteSignUp = () => {
    this.setState({showSignupModal: false});
    // this.props.enqueueSnackbar("Signed up successfully!", {variant: 'success'})
    this.props.saveQuestions();
    this.props.history.push('/signup_success');
  }

  onNextQuestion = (currentIndex) => {
    this.setState({questionIndex: currentIndex + 1});
    this.props.history.push('/signup/' + this.props.question.hashKey + '/main/' + (currentIndex + 1));
    this.props.saveQuestions();
  }

  render() {
    const { questionIndex, loading, showSignupModal } = this.state;
    const { screenWidth, visibleSideBar } = this.props;
    const AnsweredQuestionsNumber = this.getAnsweredQuestions();
    const TotalQuestionsNumber = this.getTotalQuestionNumber();
    return(
      <MainContainer>
        <LeftSideView
          visible={visibleSideBar}
          questionIndex={questionIndex}
          onChangeIndex={(index) => this.onChangeIndex(index)}
          hideSideView={() => this.props.setVisibleSideBar(false)}
        />
        <MainQuestionInputContainer screenWidth={screenWidth}>
          <MainQuestionTotalProgressView>
            <IfView condition={screenWidth < 640}>
              <IconButton
                icon="list"
                backgroundColor={Colors.blue}
                color={Colors.lightgray}
                onPress={() => this.props.setVisibleSideBar(!visibleSideBar)}
              />
              <div />
            </IfView>
            <ProgressBar
              label={"Total questions answered " + AnsweredQuestionsNumber + '/' + TotalQuestionsNumber}
              percent={AnsweredQuestionsNumber / TotalQuestionsNumber * 100}
              barColor={Colors.blue}
              width={screenWidth / 3}
              height={4}
              align={"flex-end"}
            />
          </MainQuestionTotalProgressView>
          <MainQuestionContent>
            {questionIndex === 1 && <CompanyStatusQuestion />}
            {questionIndex === 2 && <EconomicGrowthQuestion />}
            {questionIndex === 3 && <FinancingQuestion />}
            {questionIndex === 4 && <IntellectualPropertyQuestion />}
            {questionIndex === 5 && <EnergyChallengeQuestion />}
          </MainQuestionContent>
          <MainQuestionFooter >
            <div
              id="google_translate_element"
              style={{
                paddingLeft: visibleSideBar ? 320 : 20
              }}
            />
            <IfView condition={questionIndex === 5}>
              <CustomButton
                text={'SUBMIT'}
                backgroundColor={Colors.lightgray}
                onPress={() => this.onSubmit()}
                loading={loading}
                color={Colors.blue}
                style={{margin: '10px 20px'}}
              />
              <CustomButton
                text={'NEXT'}
                backgroundColor={Colors.lightgray}
                onPress={() => this.onNextQuestion(questionIndex)}
                loading={loading}
                color={Colors.gray}
                style={{margin: '10px 20px'}}
              />
            </IfView>
          </MainQuestionFooter>
        </MainQuestionInputContainer>
        {
          showSignupModal &&
          <SignUpScreen
            onCompleteSignUp={() => this.onCompleteSignUp()}
            onCancel={() => this.setState({showSignupModal: false})}
          />
        }
      </MainContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
  visibleSideBar: state.screenReducer.visibleSideBar,
  question: state.questionReducer
});

const mapDispatchToProps = ({
  setVisibleSideBar: screenActions.setVisibleSideBar,
  saveQuestions: questionActions.saveQuestions,
  setSubmitted: questionActions.setSubmitted,
  loadAnswers: questionActions.loadAnswers,
  resetQuestions: questionActions.resetQuestions
})

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(MainQuestionScreen));
