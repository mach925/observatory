import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import { Text, SpanText, Bold, Row } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { QuestionInputWrapper } from '../../../styles/signup';
import { NumberFormatCustom } from '../../../components';
import { questionActions } from '../../../redux/actions';
import { validateQuestion } from '../../../lib/operators';

const styles = theme => ({
  container: {
    padding: 30,
    [theme.breakpoints.down('sm')]: {
      padding: '10px'
    },
  },
  numberInput: {
    height: 41,
    width: '100%'
  }
})

class EconomicGrowthQuestion extends React.Component {

  handleInputChange = name => event => {
    this.props.updateEconomicGrowth({
      [name]: event.target.value
    });
  };

  handleForecastCheckbox = () => event => {
    if(event.target.checked) {
      this.props.updateEconomicGrowth({
        salesForecastCount: 'No'
      });
    } else {
      this.props.updateEconomicGrowth({
        salesForecastCount: ''
      });
    }
  }

  render() {
    const { classes, economic_growth, questions } = this.props;
    return(
      <Grid container className={classes.container}>
        <Grid container justify="flex-end">
          <Text fontSize={30} color={Colors.blue} padding="10px">Economic Growth 2018</Text>
        </Grid>
        <Grid container justify="flex-end">
          <Text fontSize={24} color={Colors.gray} align="right" padding="10px 10px 40px 0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} >
              <QuestionInputWrapper validation={validateQuestion(questions, 'economic_growth', 'salesAmount')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q11&nbsp;&nbsp;</SpanText>
                    |&nbsp; {'2018 CUSTOMER SALES (k' + questions.currency.value + ') - SALES EXCLUDING GRANTS OR ANY OTHER INCOME NOT COMING FROM DIRECT SALES TO CLIENTS.'}
                  </span>
                </Text>
                <Row>
                  <Text fontSize={20} color={Colors.blue} margin="0 10px 0 0">{questions.currency.value}</Text>
                  {/* <CustomInput
                    type="number"
                    value={economic_growth.salesAmount.toString()}
                    minNumber={0}
                    onChange={this.handleInputChange('salesAmount')}
                    isCount={false}
                  />    */}
                  <NumberFormatCustom
                    value={economic_growth.salesAmount.toString()}
                    onChange={this.handleInputChange('salesAmount')}
                    isCount={false}
                  />
                </Row>

              </QuestionInputWrapper>
            </Grid>
            <Grid item xs={12} >
              <QuestionInputWrapper validation={validateQuestion(questions, 'economic_growth', 'salesPercentage')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q12&nbsp;&nbsp;</SpanText>
                    |&nbsp; WHICH PERCENTAGE OF SALES WAS INTERNATIONAL IN 2018?
                  </span>
                </Text>
                <Grid container>
                  <NumberFormatCustom
                    value={economic_growth.salesPercentage.toString()}
                    onChange={this.handleInputChange('salesPercentage')}
                    isCount={false}
                    max={100}
                  />
                </Grid>
              </QuestionInputWrapper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid item xs={12} >
              <Bold><Text fontSize={16} color={Colors.gray} padding="10px">Economic Growth Forecast</Text></Bold>
              <QuestionInputWrapper validation={validateQuestion(questions, 'economic_growth', 'salesForecastCount')}>
                <Text color={Colors.gray} padding="0 0 20px 0">
                  <span>
                    <SpanText color={Colors.blue}>Q13&nbsp;&nbsp;</SpanText>
                    |&nbsp; CUSTOMER SALES FORECAST: FORECAST EXCLUDING GRANTS OR ANY OTHER INCOME NOT COMING FROM DIRECT SALES TO CLIENTS IN 2019
                  </span>
                </Text>
                <Row>
                  <Text fontSize={20} color={Colors.blue} margin="0 10px 0 0">{questions.currency.value}</Text>
                  <NumberFormatCustom
                    value={economic_growth.salesForecastCount.toString()}
                    onChange={this.handleInputChange('salesForecastCount')}
                    isCount={false}
                  />
                </Row>
                <Grid container>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={economic_growth.salesForecastCount === 'No'}
                        onChange={this.handleForecastCheckbox()}
                      />
                    }
                    label="No forecast has been made yet"
                  />
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
  economic_growth: state.questionReducer.economic_growth,
  questions: state.questionReducer
});

const mapDispatchToProps = ({
  updateEconomicGrowth: questionActions.updateEconomicGrowth,
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EconomicGrowthQuestion));
