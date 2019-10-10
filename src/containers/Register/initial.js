import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import { Colors } from '../../lib/theme';
import { Wrapper, SideImage, SideOverLap, LogoView } from '../../styles/signup';
import { Row, WhiteLText, WhiteMText, WhiteSText, PV, Text, RightView, searchSelectStyle, GraySText } from '../../styles/global';
import { CustomInput, ResponseView, NumberFormatCustom } from '../../components';
import CustomButton from '../../components/CustomButton';
import { CountryAndRegion, LoremIpsumText } from '../../lib/constants';
import { questionActions } from '../../redux/actions';
import { ImageSolarPlant } from '../../assets/images';
import { getYearList, generateOptionValue, generateOptions } from '../../lib/operators';

const styles = {
  container: {
    minHeight: '100vh',
  },
  wrapper: {
    backgroundColor: Colors.lightgray,
    padding: '40px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

class InitialSignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: {}
    }
  }

  componentDidMount() {
    const hashKey = this.props.match.params.hash_key;
    if(this.props.question.hashKey !== hashKey) this.props.resetQuestions({hashKey});
    this.props.loadAnswers(hashKey);
  }

  handleInputChange = name => event => {
    this.props.updateQuestion({
      initial: {
        ...this.props.question.initial,
        [name]: event.target.value,
      }
    });
  };

  handleSelectInputChange = name => option => {
    this.props.updateQuestion({
      initial: {
        ...this.props.question.initial,
        [name]: option.label,
      }
    });
  }

  onBlurInput = () => {
    // this.props.saveQuestions();
    this.checkInputValidation();
  }

  onPressNext = () => {
    if(!this.checkInputValidation()) return;
    this.props.saveQuestions();
    this.props.history.push('/signup/' + this.props.question.hashKey + '/main/1');
  }

  checkInputValidation = () => {
    const { company, activity, incubation, website, name, surname, position, email } = this.props.question.initial;
    this.setState({error: {}})
    let error = {};
    if(company.length === 0) error.company = 'This field is required';
    if(activity.length === 0) error.activity = 'This field is required';
    if(incubation.length === 0) error.incubation = 'This field is required';
    if(website.length === 0) error.website = 'This field is required';
    if(name.length === 0) error.name = 'This field is required';
    if(surname.length === 0) error.surname = 'This field is required';
    if(position.length === 0) error.position = 'This field is required';
    if(email.length === 0) error.email = 'This field is required';
    this.setState({error});
    if(Object.keys(error).length === 0) return true;
    else return false;
  }

  render() {
    const { error } = this.state;
    const { company, country, region, activity, incubation, website,
        numberOfCoFounder, incorporatedYear, name, surname, position, email, loading } = this.props.question.initial;
    const { classes, screenWidth } = this.props;
    return(
      <div>
        <Grid container className={classes.container}>
          <ResponseView type="mobile" toggleWidth={960}>
            <SideImage src={ImageSolarPlant} style={{height: 300, position: 'relative'}}>
              <SideOverLap />
              <PV padding={30}>
                <WhiteLText>E-Observatory</WhiteLText>
                <WhiteMText>Questionnaire 2018</WhiteMText>
                <WhiteSText>{LoremIpsumText}</WhiteSText>
              </PV>
            </SideImage>
          </ResponseView>
          <Grid item xs={12} md={8} className={classes.wrapper} style={{borderWidth: screenWidth < 640 ? 0 : null}}>
            <Wrapper>
              <Row>
                <LogoView />
              </Row>
              <Text color={Colors.gray} fontSize={30} padding="30px 0 0 0">Tell us more about your start-up...</Text>
              <Text color={Colors.gray} fontSize={12}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              <Grid container justify="space-between">
                <Grid item xs={12} md={6}>
                  <CustomInput
                    error={error.company}
                    label={"COMPANY NAME"}
                    value={company}
                    onChange={this.handleInputChange('company')}
                    onBlur={this.onBlurInput}
                  />
                  <CustomInput
                    error={error.activity}
                    label={"ACTIVITY"}
                    value={activity}
                    onChange={this.handleInputChange('activity')}
                    multiline={true}
                    rows={6}
                    onBlur={this.onBlurInput}
                  />
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <GraySText>NUMBER OF CO_FOUNDERS</GraySText>
                      <Grid container>
                        <NumberFormatCustom
                          value={numberOfCoFounder}
                          onChange={this.handleInputChange('numberOfCoFounder')}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <GraySText>YEARS INCORPORATED</GraySText>
                      <Select
                        value={generateOptionValue(incorporatedYear)}
                        onChange={this.handleSelectInputChange('incorporatedYear')}
                        options={generateOptions(getYearList(2000))}
                        styles={searchSelectStyle}
                        isSearchable={false}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <GraySText>COUNTRY</GraySText>
                      <Select
                        value={generateOptionValue(country)}
                        onChange={this.handleSelectInputChange('country')}
                        options={generateOptions(Object.keys(CountryAndRegion))}
                        styles={searchSelectStyle}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <GraySText>REGION</GraySText>
                      <Select
                        value={generateOptionValue(region)}
                        onChange={this.handleSelectInputChange('region')}
                        options={generateOptions(CountryAndRegion[country])}
                        styles={searchSelectStyle}
                      />
                    </Grid>
                  </Grid>
                  <CustomInput
                    error={error.incubation}
                    label={"HAVE YOU BEEN IN AN INCUBATION PROGRAM?"}
                    value={incubation}
                    onChange={this.handleInputChange('incubation')}
                    multiline={true}
                    rows={2}
                    onBlur={this.onBlurInput}
                  />
                  <CustomInput
                    error={error.website}
                    label={"WEBSITE"}
                    value={website}
                    onChange={this.handleInputChange('website')}
                    onBlur={this.onBlurInput}
                  />
                </Grid>
              </Grid>
              <Text color={Colors.gray} fontSize={30} padding="30px 0 0 0">And about you...</Text>
              <Text color={Colors.gray} fontSize={12}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              <Grid container justify="space-between">
                <Grid item xs={12} md={6}>
                  <Grid container>
                    <Grid item xs={6}>
                      <CustomInput
                        label={'NAME'}
                        value={name}
                        error={error.name}
                        onChange={this.handleInputChange('name')}
                        onBlur={this.onBlurInput}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomInput
                        label={'SURNAME'}
                        value={surname}
                        error={error.surname}
                        onChange={this.handleInputChange('surname')}
                        onBlur={this.onBlurInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomInput
                        label={'EMAIL'}
                        value={email}
                        error={error.email}
                        onChange={this.handleInputChange('email')}
                        flex={3}
                        onBlur={this.onBlurInput}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                  <CustomInput
                    label={'POSITION'}
                    value={position}
                    error={error.position}
                    onChange={this.handleInputChange('position')}
                    multiline={true}
                    rows={3}
                    onBlur={this.onBlurInput}
                  />
                </Grid>
              </Grid>
              <Grid container>

              </Grid>
              <RightView>
                <CustomButton
                  text={'SAVE CHANGES'}
                  backgroundColor={Colors.blue}
                  onPress={this.onPressNext}
                  loading={loading}
                />
              </RightView>
            </Wrapper>
          </Grid>
        </Grid>
        <ResponseView type="browser" toggleWidth={960}>
          <SideImage src={ImageSolarPlant} width={screenWidth / 3}>
            <SideOverLap />
            <PV padding={30} style={{zIndex: 10}}>
              <WhiteLText>E-Observatory</WhiteLText>
              <WhiteMText>Questionnaire 2018</WhiteMText>
              <WhiteSText>{LoremIpsumText}</WhiteSText>
            </PV>
          </SideImage>
        </ResponseView>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
  question: state.questionReducer
});

const mapDispatchToProps = ({
  saveInitialQuestion: questionActions.saveInitialQuestion,
  loadAnswers: questionActions.loadAnswers,
  resetQuestions: questionActions.resetQuestions,
  updateQuestion: questionActions.updateQuestion,
  saveQuestions: questionActions.saveQuestions
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InitialSignUp));
