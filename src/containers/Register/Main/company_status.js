import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import * as _ from 'lodash';
import { SpanText, Text, RightView, Row, Bold, searchSelectStyle } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { questionActions } from '../../../redux/actions';
import { QuestionInputWrapper } from '../../../styles/signup';
import { IconButton, NumberFormatCustom } from '../../../components';
import { StageList, CountryList, BusinessTypes,
    typesOfCompany, typesOfCooperation, YesAndNo } from '../../../lib/constants';
import { getYearList, validateQuestion, generateOptions, generateOptionValue } from '../../../lib/operators';
import { activitySector } from '../../../lib/sectorLiterals';

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
  },
  tableCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

class CompanyStatusQuestion extends React.Component {

  handleInputChange = name => event => {
    this.props.updateCompanyStatus({
      [name]: event.target.value
    });
  };

  handleOptionChange = name => option => {
    this.props.updateCompanyStatus({
      [name]: option.label
    });
  };

  handleOperateOptionInputChange = (name, index) => option => {
    let operateList = this.props.company_status.operateList;
    operateList[index] = {
      ...operateList[index],
      to: name === 'from' ? 'Still operating' : operateList[index].to,
      [name]: option.label,
    }
    this.props.updateCompanyStatus({ operateList });
  }

  handleSectorOptionInputChange = (name, index) => option => {
    let sectorList = this.props.company_status.sectorList;
    if(name === 'level1'){
      sectorList[index] = {
        level1: option.label,
        level2: '',
        level3: ''
      }
    } else if(name === 'level2'){
      sectorList[index] = {
        ...sectorList[index],
        level2: option.label,
        level3: ''
      }
    } else {
      sectorList[index] = {
        ...sectorList[index],
        level3: option.label,
      }
    }
    this.props.updateCompanyStatus({ sectorList });
  }

  handlePartnerShipInputChange = option => {
    if(option.label === 'No') {
      this.props.updateCompanyStatus({
        partnerShip: 'No'
      })
    } else {
      this.props.updateCompanyStatus({
        partnerShip: []
      })
    }
    this.props.updateQuestion({ partnerShip: option.label });
  }

  addOperate = () => {
    const { company_status } = this.props;
    this.props.updateCompanyStatus({
      operateList: company_status.operateList.concat([{
        country: '',
        from: '',
        to: 'Still operating'
      }])
    });
  }

  removeOperate = (index) => {
    let operateList = this.props.company_status.operateList;
    operateList.splice(index, 1)
    this.props.updateCompanyStatus({
      operateList,
    });
  }

  addSector = () => {
    const { company_status } = this.props;
    this.props.updateCompanyStatus({
      sectorList: company_status.sectorList.concat([{
        level1: '',
        level2: '',
        level3: ''
      }])
    });
  }

  removeSector = (index) => {
    let sectorList = this.props.company_status.sectorList;
    sectorList.splice(index, 1)
    this.props.updateCompanyStatus({
      sectorList,
    });
  }

  onChangeTableOption = (company, cooperation) => {
    let partnerShip = this.props.company_status.partnerShip;
    if(partnerShip[company] === cooperation) {
      let temp = {};
      Object.keys(partnerShip).map((key) => {
        if(key !== company) temp[key] = partnerShip[key];

        return true;
      })
      partnerShip = temp;
    } else {
      partnerShip = {
        ...partnerShip,
        [company]: cooperation
      }
    }
    this.props.updateCompanyStatus({
      partnerShip
    });
  }

  isChecked = (companyIndex, cooperationIndex) => {
    return _.find(this.props.company_status.partnerShip, {
      typeOfCompany: typesOfCompany[companyIndex],
      typeOfCooperation: typesOfCooperation[cooperationIndex]
    })
  }

  render() {
    const { classes, company_status, questions } = this.props;
    return(
      <Grid container className={classes.container}>
        <Grid container justify="flex-end">
          <Text fontSize={30} color={Colors.blue} padding="10px">Company Status 2019</Text>
        </Grid>
        <Grid container justify="flex-end">
          <Text fontSize={24} color={Colors.gray} align="right" padding="10px 10px 40px 0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={12} >
                <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'stage')}>
                  <Text color={Colors.gray} padding="0 0 20px 0">
                    <span>
                      <SpanText color={Colors.blue}>Q1&nbsp;&nbsp;</SpanText>
                      |&nbsp; IN YOUR OPTION IN WHICH STAGE THE COMPANY IS?
                    </span>
                  </Text>
                  <Select
                    value={generateOptionValue(company_status.stage)}
                    onChange={this.handleOptionChange('stage')}
                    options={generateOptions(StageList)}
                    placeholder="Type of stage"
                    styles={searchSelectStyle}
                    isSearchable={false}
                  />
                </QuestionInputWrapper>
              </Grid>
              <Grid item xs={12} >
                <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'employeeCount')}>
                  <Text color={Colors.gray} padding="0 0 20px 0">
                    <span>
                      <SpanText color={Colors.blue}>Q2&nbsp;&nbsp;</SpanText>
                      |&nbsp; NUMBER OF EMPLOYEES (WITHOUT FOUNDERS)
                    </span>
                  </Text>
                  <Grid container>
                    <NumberFormatCustom
                      value={company_status.employeeCount.toString()}
                      onChange={this.handleInputChange('employeeCount')}
                    />
                  </Grid>
                </QuestionInputWrapper>
              </Grid>
              <Grid item xs={12} >
                <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'operateList')}>
                  <Text color={Colors.gray} padding="0 0 20px 0">
                    <span>
                      <SpanText color={Colors.blue}>Q3&nbsp;&nbsp;</SpanText>
                      |&nbsp; IN WHICH COUNTRIES DOES THE COMPANY OPERATE?
                    </span>
                  </Text>
                  {
                    Array.apply(null, {length: company_status.operateList.length}).map((item, index) => {
                      const operateData = company_status.operateList[index];
                      console.log(index)
                      return(
                        <Row key={index} className={classes.operateItemView}>
                          <Grid container>
                            <Grid item xs={12} lg={6}>
                              <Select
                                value={generateOptionValue(operateData.country)}
                                onChange={this.handleOperateOptionInputChange('country', index)}
                                options={generateOptions(CountryList)}
                                placeholder="Country"
                                styles={searchSelectStyle}
                              />
                            </Grid>
                            <Grid item xs={6} lg={3}>
                              <Select
                                value={generateOptionValue(operateData.from)}
                                onChange={this.handleOperateOptionInputChange('from', index)}
                                options={generateOptions(getYearList())}
                                styles={searchSelectStyle}
                                isSearchable={false}
                                placeholder="From"
                              />
                            </Grid>
                            <Grid item xs={6} lg={3}>
                              <Select
                                value={
                                  Number(operateData.from.value) > Number(operateData.to.value) ?
                                  generateOptionValue('')
                                  :generateOptionValue(operateData.to)
                                }
                                onChange={this.handleOperateOptionInputChange('to', index)}
                                options={generateOptions(['Still operating'].concat(getYearList(Number(operateData.from))))}
                                styles={searchSelectStyle}
                                isSearchable={false}
                                placeholder="To"
                              />
                            </Grid>
                          </Grid>
                          <IconButton
                            icon="close"
                            backgroundColor={Colors.error}
                            color={Colors.lightgray}
                            onPress={() => this.removeOperate(index)}
                            size={20}
                            fontSize={12}
                            visible={company_status.operateList.length > 1 || index > 0}
                          />
                        </Row>
                      )
                    })
                  }
                  {
                    validateQuestion(questions, 'company_status', 'operateList', false) &&
                    <RightView>
                      <Text color={Colors.gray}>Add another country</Text>
                      <IconButton
                        icon="add"
                        size={24}
                        backgroundColor={Colors.gray}
                        color={Colors.lightgray}
                        onPress={() => this.addOperate()}
                      />
                    </RightView>
                  }
                </QuestionInputWrapper>

              </Grid>
              <Grid item xs={12} >
                <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'businessType')}>
                  <Text color={Colors.gray} padding="0 0 20px 0">
                    <span>
                      <SpanText color={Colors.blue}>Q4&nbsp;&nbsp;</SpanText>
                      |&nbsp; TYPE OF BUSINESS
                    </span>
                  </Text>
                  <Select
                    value={generateOptionValue(company_status.businessType)}
                    onChange={this.handleOptionChange('businessType')}
                    options={generateOptions(BusinessTypes)}
                    placeholder="Type of business"
                    styles={searchSelectStyle}
                    isSearchable={false}
                  />
                </QuestionInputWrapper>
              </Grid>
              <Grid item xs={12} >
                <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'sectorList')}>
                  <Text color={Colors.gray} padding="0 0 20px 0">
                    <span>
                      <SpanText color={Colors.blue}>Q5&nbsp;&nbsp;</SpanText>
                      |&nbsp; ACTIVITY SECTOR
                    </span>
                  </Text>
                  {
                    Array.apply(null, {length: company_status.sectorList.length}).map((item, index) => {
                      const sectorData = company_status.sectorList[index];
                      return(
                        <Row key={index} className={classes.operateItemView}>
                          <Grid container>
                            <Grid item xs={12} lg={4}>
                              <Select
                                value={generateOptionValue(sectorData.level1)}
                                onChange={this.handleSectorOptionInputChange('level1', index)}
                                options={generateOptions(Object.keys(activitySector))}
                                placeholder="Level1"
                                styles={searchSelectStyle}
                                isSearchable={false}
                              />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                              <Select
                                value={generateOptionValue(sectorData.level2)}
                                onChange={this.handleSectorOptionInputChange('level2', index)}
                                options={sectorData.level1.length === 0 ? [] : generateOptions(Object.keys(activitySector[sectorData.level1]))}
                                placeholder="Level2"
                                styles={searchSelectStyle}
                                isSearchable={false}
                              />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                              <Select
                                value={generateOptionValue(sectorData.level3)}
                                onChange={this.handleSectorOptionInputChange('level3', index)}
                                options={(sectorData.level1.length * sectorData.level2.length === 0) ? [] : generateOptions(activitySector[sectorData.level1][sectorData.level2])}
                                placeholder="Level3"
                                styles={searchSelectStyle}
                                isSearchable={false}
                              />
                            </Grid>
                          </Grid>
                          <IconButton
                            icon="close"
                            backgroundColor={Colors.error}
                            color={Colors.lightgray}
                            onPress={() => this.removeSector(index)}
                            size={20}
                            fontSize={12}
                            visible={company_status.sectorList.length > 1 || index > 0}
                          />
                        </Row>
                      )
                    })
                  }
                  <RightView>
                    <Text color={Colors.gray}>Add another sector</Text>
                    <IconButton
                      icon="add"
                      size={24}
                      backgroundColor={Colors.gray}
                      color={Colors.lightgray}
                      onPress={() => this.addSector()}
                    />
                  </RightView>
                </QuestionInputWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} >
              <Bold><Text fontSize={16} color={Colors.gray} padding="10px">Job Creation 2019</Text></Bold>
              <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'JobCount2018')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q6&nbsp;&nbsp;</SpanText>
                    |&nbsp; HOW MANY DIRECT JOBS HAVE YOU CREATED IN 2018?
                  </span>
                </Text>
                <Grid container>
                  <NumberFormatCustom
                    value={company_status.JobCount2018.toString()}
                    onChange={this.handleInputChange('JobCount2018')}
                  />
                </Grid>
              </QuestionInputWrapper>
            </Grid>
            <Grid item xs={12} >
              <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'fullTimeJobCount2018')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q7&nbsp;&nbsp;</SpanText>
                    |&nbsp; HOW MANY OF THOSE ARE FULL_TIME EMPLOYEES?
                  </span>
                </Text>
                <Grid container>
                  <NumberFormatCustom
                    value={company_status.fullTimeJobCount2018.toString()}
                    onChange={this.handleInputChange('fullTimeJobCount2018')}
                    max={Number(company_status.JobCount2018)}
                  />
                </Grid>
              </QuestionInputWrapper>
            </Grid>
            <Grid item xs={12} >
              <Bold><Text fontSize={16} color={Colors.gray} padding="10px">Job Creation Forecast</Text></Bold>
              <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'JobCount2019')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q8&nbsp;&nbsp;</SpanText>
                    |&nbsp; HOW DIRECT JOBS ARE YOU PLANNING TO CREATE IN 2019?
                  </span>
                </Text>
                <Grid container>
                  <NumberFormatCustom
                    value={company_status.JobCount2019.toString()}
                    onChange={this.handleInputChange('JobCount2019')}
                  />
                </Grid>
              </QuestionInputWrapper>
            </Grid>
            <Grid item xs={12} >
              <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'fullTimeJobCount2019')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q9&nbsp;&nbsp;</SpanText>
                    |&nbsp; HOW MANY DO YOU FORESEE AS FULL TIME EMPLOYEE?
                  </span>
                </Text>
                <Grid container>
                  <NumberFormatCustom
                    value={company_status.fullTimeJobCount2019.toString()}
                    onChange={this.handleInputChange('fullTimeJobCount2019')}
                    max={Number(company_status.JobCount2019)}
                  />
                </Grid>
              </QuestionInputWrapper>
            </Grid>
            <Grid item xs={12} >
              <QuestionInputWrapper validation={validateQuestion(questions, 'company_status', 'partnerShip')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q10&nbsp;&nbsp;</SpanText>
                    |&nbsp; HAVE YOU ESTABLISHED ANY PARTNERSHIPS?
                  </span>
                </Text>
                <Select
                  value={generateOptionValue(questions.partnerShip)}
                  onChange={this.handlePartnerShipInputChange}
                  options={generateOptions(YesAndNo)}
                  styles={searchSelectStyle}
                  isSearchable={false}
                  placeholder="Select"
                />
                {
                  questions.partnerShip === 'Yes' &&
                  <Grid container>
                    <Grid container>
                      <Grid item xs={4} />
                      <Grid item xs={2} className={classes.tableCell}>
                        <Text color={Colors.gray} align="center">Large Enterprise</Text>
                      </Grid>
                      <Grid item xs={2} className={classes.tableCell}>
                        <Text color={Colors.gray} align="center">Medium-sized</Text>
                      </Grid>
                      <Grid item xs={2} className={classes.tableCell}>
                        <Text color={Colors.gray} align="center">Small</Text>
                      </Grid>
                      <Grid item xs={2} className={classes.tableCell}>
                        <Text color={Colors.gray} align="center">Micro</Text>
                      </Grid>
                    </Grid>
                    {
                      typesOfCooperation.map((item, index) => {
                        return(
                          <Grid container key={index}>
                            <Grid item xs={4}>
                              <Text color={Colors.gray}>{item}</Text>
                            </Grid>
                            <Grid item xs={2} className={classes.tableCell}>
                              <input type="checkbox" checked={company_status.partnerShip[item] === 'Large Enterprise'} onChange={() => this.onChangeTableOption(item, 'Large Enterprise')}/>
                            </Grid>
                            <Grid item xs={2} className={classes.tableCell}>
                              <input type="checkbox" checked={company_status.partnerShip[item] === '"Medium-sized'} onChange={() => this.onChangeTableOption(item, '"Medium-sized')}/>
                            </Grid>
                            <Grid item xs={2} className={classes.tableCell}>
                              <input type="checkbox" checked={company_status.partnerShip[item] === 'Small'} onChange={() => this.onChangeTableOption(item, 'Small')}/>
                            </Grid>
                            <Grid item xs={2} className={classes.tableCell}>
                              <input type="checkbox" checked={company_status.partnerShip[item] === 'Micro'} onChange={() => this.onChangeTableOption(item, 'Micro')}/>
                            </Grid>
                          </Grid>
                        )
                      })
                    }
                  </Grid>
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
  company_status: state.questionReducer.company_status,
  questions: state.questionReducer
});

const mapDispatchToProps = ({
  updateCompanyStatus: questionActions.updateCompanyStatus,
  updateQuestion: questionActions.updateQuestion,
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CompanyStatusQuestion));
