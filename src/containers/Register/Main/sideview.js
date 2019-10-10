import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { Text, CenterRow, MText, SBView, searchSelectStyle } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { LeftSideWrapper, MainLogoView, CurrencyOptionView, CurrencyOptionInnerView } from '../../../styles/signup';
import { ProgressBar, ResponseView, IconButton } from '../../../components';
import { validateQuestion } from '../../../lib/operators';
import { CurrencyList } from '../../../lib/constants';
import { questionActions } from '../../../redux/actions';

const styles = ({
  button: {
    width: '100%',
    marginLeft: -10,
    padding: 10,
    justifyContent: 'flex-start'
  },
  selectedButton: {
    width: '100%',
    marginLeft: -10,
    padding: 10,
    justifyContent: 'flex-start',
    color: Colors.blue
  }
})
class LeftSideView extends React.Component {

  getProgress = (what, category) => {
    const { questions } = this.props;
    let completed_count = 0;
    Object.keys(questions[category]).map((key) => {
      if(validateQuestion(questions, category, key, false)) completed_count++;

      return true;
    })
    if(what === 'text') return completed_count + '/' + Object.keys(questions[category]).length;
    else return completed_count / Object.keys(questions[category]).length * 100;
  }

  hideSideView = () => {
    this.props.hideSideView();
  }

  onChangeIndex = (index) => {
    this.props.onChangeIndex(index);
    if(this.props.screenWidth < 640) this.props.hideSideView();
  }

  changeCurrency = option => {
    this.props.changeCurrency(option);
  }

  render() {
    const { visible, questionIndex, questions, screenWidth, classes } = this.props;
    return(
      <LeftSideWrapper screenWidth={screenWidth} style={{marginLeft: visible ? 0 : -300}}>
        <SBView>
          <CenterRow>
            <MainLogoView />
          </CenterRow>
          <ResponseView type="mobile" toggleWidth={640}>
            <IconButton
              icon="keyboard_backspace"
              backgroundColor={Colors.blue}
              color={Colors.lightgray}
              onPress={() => this.hideSideView()}
              margin={0}
            />
          </ResponseView>
        </SBView>
        <MText>E-Observatory</MText>
        <hr color={Colors.green} />
        {/* <SText>Welcome</SText> */}
        <Button
          className={questionIndex === 1 ? classes.selectedButton : classes.button}
          onClick={() => this.onChangeIndex(1)}
        >
          Company Status 2019
        </Button>
        {
          questionIndex === 1 &&
          <ProgressBar
            label={this.getProgress('text', 'company_status')}
            percent={this.getProgress('percentage', 'company_status')}
            fullWidth
          />
        }
        <Button
          className={questionIndex === 2 ? classes.selectedButton : classes.button}
          onClick={() => this.onChangeIndex(2)}
        >
          Economic Growth 2018
        </Button>
        {
          questionIndex === 2 &&
          <ProgressBar
            label={this.getProgress('text', 'economic_growth')}
            percent={this.getProgress('percentage', 'economic_growth')}
            fullWidth
          />
        }
        <Button
          className={questionIndex === 3 ? classes.selectedButton : classes.button}
          onClick={() => this.onChangeIndex(3)}
        >
          Financing 2018
        </Button>
        {
          questionIndex === 3 &&
          <ProgressBar
            label={this.getProgress('text', 'financing')}
            percent={this.getProgress('percentage', 'financing')}
            fullWidth
          />
        }
        <Button
          className={questionIndex === 4 ? classes.selectedButton : classes.button}
          onClick={() => this.onChangeIndex(4)}
        >
          Intellectual Property 2018
        </Button>
        {
          questionIndex === 4 &&
          <ProgressBar
            label={this.getProgress('text', 'intellectual_property')}
            percent={this.getProgress('percentage', 'intellectual_property')}
            fullWidth
          />
        }
        <Button
          className={questionIndex === 5 ? classes.selectedButton : classes.button}
          onClick={() => this.onChangeIndex(5)}
        >
          Energy Challenges
        </Button>
        {
          questionIndex === 5 &&
          <ProgressBar
            label={this.getProgress('text', 'energy_challenges')}
            percent={this.getProgress('percentage', 'energy_challenges')}
            fullWidth
          />
        }
        <CurrencyOptionView>
          <CurrencyOptionInnerView>
            <Text color={Colors.text} fontSize={14} padding="10px 5px">Currency</Text>
            <Select
              value={questions.currency}
              onChange={this.changeCurrency}
              options={CurrencyList}
              styles={searchSelectStyle}
              isSearchable={false}
              menuPosition="fixed"
            />
          </CurrencyOptionInnerView>
        </CurrencyOptionView>
      </LeftSideWrapper>
    )
  }
}

LeftSideView.propTypes = {
  visible: PropTypes.bool.isRequired,
  questionIndex: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
  hideSideView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
  questions: state.questionReducer
});

const mapDispatchToProps = ({
  changeCurrency: questionActions.changeCurrency
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LeftSideView));
