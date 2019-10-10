import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Select from 'react-select';
import { Text, SpanText, Bold, Row, searchSelectStyle } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { QuestionInputWrapper } from '../../../styles/signup';
import { IconButton, NumberFormatCustom } from '../../../components';
import { questionActions } from '../../../redux/actions';
import { CountryList, EuropeCountryList, YesAndNo } from '../../../lib/constants';
import { getYearList, validateQuestion, generateOptions, generateOptionValue } from '../../../lib/operators';

const styles = theme => ({
  container: {
    padding: 30,
    [theme.breakpoints.down('sm')]: {
      padding: '10px'
    },
  },
  operateItemView: {
    marginTop: 5,
    marginBottom: 5,
  }
})

class IntellectualPropertyQuestion extends React.Component {

  handleInputChange = (name, key) => option => {
    if(option.label === 'No') {
      this.props.updateIntellectualProperty({
        [key]: 'No'
      })
    } else if(key === 'patentList'){
      this.props.updateIntellectualProperty({
        [key]: [{
          country: '',
          year: '',
          count: 1
        }]
      })
    } else {
      this.props.updateIntellectualProperty({
        [key]: [{
          territory: '',
          count: 1
        }]
      })
    }
    this.props.updateQuestion({
      [name]: option.label
    });
  };

  handleFormInputChange = (name, key, index) => event => {
    let temp = this.props.intellectual_property[key];
    temp[index] = {
      ...temp[index],
      [name]: name === 'count' ? event.target.value : event.label
    }
    this.props.updateIntellectualProperty({ [key]: temp });
  }

  addPatent = () => {
    const { intellectual_property } = this.props;
    this.props.updateIntellectualProperty({
      patentList: intellectual_property.patentList.concat([{
        country: '',
        year: '',
        count: 1
      }])
    });
  }

  removePatent = (index) => {
    let patentList = this.props.intellectual_property.patentList;
    patentList.splice(index, 1)
    this.props.updateIntellectualProperty({
      patentList,
    });
  }

  addPlan = () => {
    const { intellectual_property } = this.props;
    this.props.updateIntellectualProperty({
      planList: intellectual_property.planList.concat([{
        territory: '',
        count: 1
      }])
    });
  }

  removePlan = (index) => {
    let planList = this.props.intellectual_property.planList;
    planList.splice(index, 1)
    this.props.updateIntellectualProperty({
      planList,
    });
  }

  render() {
    const { classes, intellectual_property, questions } = this.props;
    return(
      <Grid container className={classes.container}>
        <Grid container justify="flex-end">
          <Text fontSize={30} color={Colors.blue} padding="10px">Intellectual Property 2018</Text>
        </Grid>
        <Grid container justify="flex-end">
          <Text fontSize={24} color={Colors.gray} align="right" padding="10px 10px 40px 0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} >
              <QuestionInputWrapper validation={validateQuestion(questions, 'intellectual_property', 'patentList')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q17&nbsp;&nbsp;</SpanText>
                    |&nbsp; DO YOU HAVE ANY REGISTERED PATENTS?
                  </span>
                </Text>
                <Grid item xs={12} >
                  <Select
                    value={generateOptionValue(questions.hasPatent)}
                    onChange={this.handleInputChange('hasPatent', 'patentList')}
                    options={generateOptions(YesAndNo)}
                    placeholder="Select"
                    styles={searchSelectStyle}
                    isSearchable={false}
                  />
                </Grid>
                {
                  questions.hasPatent === 'Yes' &&
                  Array.apply(null, {length: intellectual_property.patentList.length}).map((item, index) => {
                    const patentData = intellectual_property.patentList[index];
                    return(
                      <Row key={index} className={classes.operateItemView}>
                        <Grid container key={index}>
                          <Grid item xs={12} sm={6}>
                            <Select
                              value={generateOptionValue(patentData.country)}
                              onChange={this.handleFormInputChange('country', 'patentList', index)}
                              options={generateOptions(CountryList)}
                              placeholder="Country"
                              styles={searchSelectStyle}
                            />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Select
                              value={generateOptionValue(patentData.year)}
                              onChange={this.handleFormInputChange('year', 'patentList', index)}
                              options={generateOptions(getYearList(1960))}
                              placeholder="Year"
                              styles={searchSelectStyle}
                              isSearchable={false}
                            />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Grid container>
                              <NumberFormatCustom
                                value={patentData.count.toString()}
                                onChange={this.handleFormInputChange('count', 'patentList', index)}
                                min={1}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <IconButton
                          icon="close"
                          backgroundColor={Colors.error}
                          color={Colors.lightgray}
                          onPress={() => this.removePatent(index)}
                          size={20}
                          fontSize={12}
                          margin={2}
                          visible={intellectual_property.patentList.length > 1 || index > 0}
                        />
                      </Row>
                    )
                  })
                }
                {
                  questions.hasPatent === 'Yes' && validateQuestion(questions, 'intellectual_property', 'patentList', false) &&
                  <Row>
                    <IconButton
                      icon="add"
                      size={24}
                      backgroundColor={Colors.gray}
                      color={Colors.lightgray}
                      onPress={() => this.addPatent()}
                    />
                    <Text color={Colors.gray}>Add another country</Text>
                  </Row>
                }
              </QuestionInputWrapper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} >
              <Bold><Text fontSize={16} color={Colors.gray} padding="10px">Intellectual Property Forecast 2019</Text></Bold>
              <QuestionInputWrapper validation={validateQuestion(questions, 'intellectual_property', 'planList')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q18&nbsp;&nbsp;</SpanText>
                    |&nbsp; DO YOU HAVE PLAN TO REGISTER PATENTS IN 2019?
                  </span>
                </Text>
                <Grid item xs={12} >
                  <Select
                    value={generateOptionValue(questions.hasPlan)}
                    onChange={this.handleInputChange('hasPlan', 'planList')}
                    options={generateOptions(YesAndNo)}
                    placeholder="Select"
                    styles={searchSelectStyle}
                    isSearchable={false}
                  />
                </Grid>
                {
                  questions.hasPlan === 'Yes' &&
                  Array.apply(null, {length: intellectual_property.planList.length}).map((item, index) => {
                    const planData = intellectual_property.planList[index];
                    return(
                      <Row key={index} className={classes.operateItemView}>
                        <Grid container key={index}>
                          <Grid item xs={8}>
                            <Select
                              value={generateOptionValue(planData.territory)}
                              onChange={this.handleFormInputChange('territory', 'planList', index)}
                              options={generateOptions(EuropeCountryList)}
                              placeholder="Country"
                              styles={searchSelectStyle}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Grid container>
                              <NumberFormatCustom
                                value={(planData.count === undefined) ? '1' :planData.count.toString()}
                                onChange={this.handleFormInputChange('count', 'planList', index)}
                                min={1}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <IconButton
                          icon="close"
                          backgroundColor={Colors.error}
                          color={Colors.lightgray}
                          onPress={() => this.removePlan(index)}
                          size={20}
                          fontSize={12}
                          margin={2}
                          visible={intellectual_property.planList.length > 1 || index > 0}
                        />
                      </Row>
                    )
                  })
                }
                {
                  questions.hasPlan === 'Yes' && validateQuestion(questions, 'intellectual_property', 'planList', false) &&
                  <Row>
                    <IconButton
                      icon="add"
                      size={24}
                      backgroundColor={Colors.gray}
                      color={Colors.lightgray}
                      onPress={() => this.addPlan()}
                    />
                    <Text color={Colors.gray}>Add another country</Text>
                  </Row>
                }
              </QuestionInputWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  intellectual_property: state.questionReducer.intellectual_property,
  questions: state.questionReducer
});

const mapDispatchToProps = ({
  updateIntellectualProperty: questionActions.updateIntellectualProperty,
  updateQuestion: questionActions.updateQuestion,
  saveQuestions: questionActions.saveQuestions
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IntellectualPropertyQuestion));
