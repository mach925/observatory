import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Icon } from '@material-ui/core';
import { Text, FlexView, searchSelectStyle } from '../../../styles/global';
import { CustomInput, CustomDatePicker, CustomButton, IconButton } from '../../../components';
import { getYearList, generateOptionValue, generateOptions } from '../../../lib/operators';
import { Colors } from '../../../lib/theme';
import { GreenLine, PopOverCloseIconView } from '../../../styles/admin_survey';

const styles = {
  container: {
    paddingTop: 120,
  },
  sentIcon: {
    color: Colors.lightgray,
    fontSize: 250
  }
}

class NewCampaignModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: {},
      name: '',
      year: new Date().getFullYear().toString(),
      launch_date: '',
      message: '',
      sent: false
    }
  }

  handleInputChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleSelectInputChange = name => option => {
    this.setState({[name]: option.label});
  };

  onChangeLaunchDate = (date) => {
    console.log(date);
    this.setState({launch_date: date})
  }

  onSend = () => {
    if(!this.checkInputValue()) return;
    this.setState({sent: true});
  }

  checkInputValue = () => {
    const { name, error } = this.state;
    if(name.length === 0) error.name = "This field is requried";
    else return true;
    this.setState({error});
    return false
  }

  render() {
    const { name, year, launch_date, message, sent, error } = this.state;
    const { classes } = this.props;
    if(sent) {
      return(
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={11} md={8} lg={6}>
            <Grid container justify="center">
              <Text color={Colors.lightgray} fontSize={30} align="center">Campaign sent</Text>
            </Grid>
            <Grid container justify="center">
              <Text color={Colors.lightgray} fontSize={16} align="center">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Text>
            </Grid>
            <Grid container>
              <FlexView justify="center" align="center">
                <Icon className={classes.sentIcon}>near_me</Icon>
              </FlexView>
            </Grid>
          </Grid>
          <PopOverCloseIconView>
            <IconButton
              icon="close"
              color={Colors.lightgray}
              backgroundColor="transparent"
              onPress={this.props.onClose}
              fontSize={30}
            />
          </PopOverCloseIconView>
        </Grid>
      )
    }
    return(
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={11} md={8} lg={6}>
          <Grid container>
            <Text color={Colors.lightgray} fontSize={30}>New campaign</Text>
            <Text color={Colors.lightgray} fontSize={16}>This campaign will send automatically the survey to all companies in your Observatory.</Text>
            <Text color={Colors.lightgray} fontSize={16} padding="0 0 30px 0">
                If you want to add new companies to the database, upload a file with the new registers in the Companies section before creating this campaign.
            </Text>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Text color={Colors.lightgray} fontSize={14}>CAMPAIGN NAME</Text>
            </Grid>
            <Grid item xs={12} md={8}>
              <CustomInput
                error={error.name}
                value={name}
                onChange={this.handleInputChange('name')}
              />
            </Grid>
          </Grid>
          <GreenLine />
          <Grid container>
            <Grid item xs={12} md={4}>
              <Text color={Colors.lightgray} fontSize={14}>SELECT YEAR</Text>
            </Grid>
            <Grid item xs={12} md={8}>
              <Select
                value={generateOptionValue(year)}
                onChange={this.handleSelectInputChange('region')}
                options={generateOptions(getYearList(2000))}
                styles={searchSelectStyle}
              />
            </Grid>
          </Grid>
          <GreenLine />
          <Grid container>
            <Grid item xs={12} md={4}>
              <Text color={Colors.lightgray} fontSize={14}>LAUNCH ON</Text>
            </Grid>
            <Grid item xs={12} md={8}>
              <CustomDatePicker date={launch_date} onSelect={this.onChangeLaunchDate} />
            </Grid>
          </Grid>
          <GreenLine />
          <Grid container>
            <Grid item xs={12} md={4}>
              <Text color={Colors.lightgray} fontSize={14}>MESSAGE FOR THE</Text>
              <Text color={Colors.lightgray} fontSize={14}>CAMPAIGN EMAIL</Text>
            </Grid>
            <Grid item xs={12} md={8}>
              <CustomInput
                value={message}
                multiline
                rows={5}
                placeholder="Optional message for the receiver"
                onChange={this.handleInputChange('message')}
              />
            </Grid>
          </Grid>
          <GreenLine />
          <Grid container>
            <FlexView justify="flex-end">
              <CustomButton
                color={Colors.gray}
                backgroundColor={Colors.lightgray}
                text="SEND CAMPAIGN"
                onPress={this.onSend}
              />
            </FlexView>
          </Grid>
        </Grid>
        <PopOverCloseIconView>
          <IconButton
            icon="close"
            color={Colors.lightgray}
            backgroundColor="transparent"
            onPress={this.props.onClose}
            fontSize={30}
          />
        </PopOverCloseIconView>
      </Grid>
    )
  }
}

NewCampaignModal.propTypes = {
  onClose: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
});

const mapDispatchToProps = ({

})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewCampaignModal));
