import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Select from 'react-select';
import { Text, SpanText, Row, Bold, searchSelectStyle } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { QuestionInputWrapper } from '../../../styles/signup';
import { IconButton, NumberFormatCustom } from '../../../components';
import { questionActions } from '../../../redux/actions';
import { fundTypeList, CountryList, FinancingPlanList } from '../../../lib/constants';
import { getYearList, validateQuestion, generateOptionValue, generateOptions } from '../../../lib/operators';

const styles = theme => ({
  container: {
    padding: 30,
    [theme.breakpoints.down('sm')]: {
      padding: '10px'
    },
  },
  questionItemView: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
  },
  questionWrapper: {
    width: '100%'
  }
})

class FinancingQuestion extends React.Component {

  handleInputChange = name => event => {
    this.props.updateFinancing({
      [name]: event.target.value
    });
  };

  handlePlanInputChange = () => option => {
    this.props.updateQuestion({
      hasPlanToRaiseFunds: option.label
    });
    if(option.label === 'Yes') {
      this.props.updateFinancing({havePlan: ""});
    } else if(option.label === 'No') {
      this.props.updateFinancing({havePlan: 'No'});
    } else {
      this.props.updateFinancing({havePlan: option.label});
    }
  }

  handleOperateInputChange = (name, index) => event => {
    let fundsList = this.props.financing.fundsList;
    fundsList[index] = {
      ...fundsList[index],
      [name]: name === 'amount' ? event.target.value : event.label
    }
    this.props.updateFinancing({ fundsList });
  }

  addFund = () => {
    const { financing } = this.props;
    this.props.updateFinancing({
      fundsList: financing.fundsList.concat([{
        amount: '',
        type: '',
        country: '',
        year: ''
      }])
    });
  }

  removeFund = (index) => {
    const { financing } = this.props;
    let fundsList = financing.fundsList;
    fundsList.splice(index, 1)
    this.props.updateFinancing({
      fundsList,
    });
  }

  render() {
    const { classes, financing, questions } = this.props;
    return(
      <Grid container className={classes.container}>
        <Grid container justify="flex-end">
          <Text fontSize={30} color={Colors.blue} padding="10px">Financing 2018</Text>
        </Grid>
        <Grid container justify="flex-end">
          <Text fontSize={24} color={Colors.gray} align="right" padding="10px 10px 40px 0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </Grid>
        <Grid container>
          <QuestionInputWrapper className={classes.questionWrapper} validation={validateQuestion(questions, 'financing', 'fundsList')}>
            <Text color={Colors.gray} padding="0 0 20px 0">
              <span>
                <SpanText color={Colors.blue}>Q14&nbsp;&nbsp;</SpanText>
                |&nbsp; {'Has your company raised any external funds in 2018 (k'+ questions.currency.value + ')'}?
              </span>
            </Text>
            {
              Array.apply(null, {length: financing.fundsList.length}).map((item, index) => {
                const fundData = financing.fundsList[index];
                return(
                  <Grid container key={index}>
                    <Row className={classes.questionItemView}>
                        <Grid container>
                          <Grid item xs={8} md={4}>
                            <Select
                              value={generateOptionValue(fundData.type)}
                              onChange={this.handleOperateInputChange('type', index)}
                              options={generateOptions(fundTypeList)}
                              placeholder="Type of funds raised"
                              styles={searchSelectStyle}
                              isSearchable={false}
                            />
                          </Grid>
                          <Grid item xs={4} md={2}>
                            <Grid container>
                              <NumberFormatCustom
                                placeholder={"Amount (" + questions.currency.value + ")"}
                                value={fundData.amount.toString()}
                                onChange={this.handleOperateInputChange('amount', index)}
                                isCount={false}
                                prefix
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={8} md={4}>
                            <Select
                              value={generateOptionValue(fundData.country)}
                              onChange={this.handleOperateInputChange('country', index)}
                              options={generateOptions(CountryList)}
                              placeholder="Country"
                              styles={searchSelectStyle}
                            />
                          </Grid>
                          <Grid item xs={4} md={2}>
                            <Select
                              value={generateOptionValue(fundData.year)}
                              onChange={this.handleOperateInputChange('year', index)}
                              options={generateOptions(getYearList(1960))}
                              placeholder="Year"
                              styles={searchSelectStyle}
                              isSearchable={false}
                            />
                          </Grid>
                        </Grid>
                      <IconButton
                        icon="close"
                        backgroundColor={Colors.error}
                        color={Colors.lightgray}
                        onPress={() => this.removeFund(index)}
                        size={20}
                        fontSize={12}
                        margin={2}
                        visible={financing.fundsList.length > 1 || index > 0}
                      />
                    </Row>
                  </Grid>
                )
              })
            }
            {
              validateQuestion(questions, 'financing', 'fundsList', false) &&
              <Row>
                <IconButton
                  icon="add"
                  size={24}
                  backgroundColor={Colors.gray}
                  color={Colors.lightgray}
                  onPress={() => this.addFund()}
                />
                <Text color={Colors.gray}>Add another country</Text>
              </Row>
            }
          </QuestionInputWrapper>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container>
              <QuestionInputWrapper className={classes.questionWrapper} validation>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q15&nbsp;&nbsp;</SpanText>
                    |&nbsp; WHAT IS THE PERCENTAGE OF EQUITY CURRENTLY OWNED BY THE COFOUNDERS? (Optional)
                  </span>
                </Text>
                <Grid container>
                  <NumberFormatCustom
                    value={financing.percentage.toString()}
                    onChange={this.handleInputChange('percentage')}
                    isCount={false}
                    max={100}
                  />
                </Grid>
              </QuestionInputWrapper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Bold><Text fontSize={16} color={Colors.gray} padding="10px">Financing Forecast</Text></Bold>
              <QuestionInputWrapper className={classes.questionWrapper} validation={validateQuestion(questions, 'financing', 'havePlan')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q16&nbsp;&nbsp;</SpanText>
                    |&nbsp; {'DO YOU HAVE PLANS TO RAISE FUNDS DURING 2019 (k' + questions.currency.value + ')?'}
                  </span>
                </Text>
                <Grid item xs={12}>
                  <Select
                    value={generateOptionValue(questions.hasPlanToRaiseFunds)}
                    onChange={this.handlePlanInputChange('havePlan')}
                    options={generateOptions(FinancingPlanList)}
                    placeholder="Select"
                    styles={searchSelectStyle}
                    isSearchable={false}
                  />
                  <br />
                  {
                    questions.hasPlanToRaiseFunds === 'Yes' &&
                    <Row>
                      <Text fontSize={20} color={Colors.blue} margin="0 10px 0 0">{questions.currency.value}</Text>
                      <NumberFormatCustom
                        value={financing.havePlan.toString()}
                        onChange={this.handleInputChange('havePlan')}
                        isCount={false}
                      />
                    </Row>
                  }
                </Grid>
              </QuestionInputWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  financing: state.questionReducer.financing,
  questions: state.questionReducer
});

const mapDispatchToProps = ({
  updateFinancing: questionActions.updateFinancing,
  updateQuestion: questionActions.updateQuestion,
  saveQuestions: questionActions.saveQuestions
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FinancingQuestion));
