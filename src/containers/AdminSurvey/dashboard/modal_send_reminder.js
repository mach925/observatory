import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, Radio, RadioGroup, Icon } from '@material-ui/core';
import { Text, FlexView } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { GreenLine, PopOverCloseIconView } from '../../../styles/admin_survey';
import { CustomInput, CustomButton, IconButton } from '../../../components';

const styles = {
  container: {
    paddingTop: 120,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30
  },
  radio: {
    width: 8,
    height: 8,
    borderRadius: 24,
    border: '8px solid gray',
    backgroundColor: 'white'
  },
  rootRadio: {
    width: 24,
    height: 24,
    color: 'white'
  },
  label: {
    color: 'white'
  },
  sentIcon: {
    color: Colors.lightgray,
    fontSize: 250
  }
}

class SendReminderModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: '1',
      message: '',
      sent: false
    }
  }
  onChangeRadio = (event, value) => {
    console.log(value);
  }

  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSend = () => {
    this.setState({sent: true});
  }

  render() {
    const { type, message, sent } = this.state;
    const { classes } = this.props;
    if(sent) {
      return(
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={11} md={8} lg={6}>
            <Grid container justify="center">
              <Text color={Colors.lightgray} fontSize={30} align="center">Reminder sent</Text>
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
            <Text color={Colors.lightgray} fontSize={30}>Campaign reminder</Text>
          </Grid>
          <Grid container>
            <Text color={Colors.lightgray} fontSize={14}>Select the users you want to send the reminder to:</Text>
          </Grid>
          <Grid container>
            <RadioGroup
              className={classes.radioGroup}
              value={type}
              onChange={this.handleInputChange('type')}
            >
              <FormControlLabel 
                value={'1'} 
                classes={{label: classes.label}} 
                control={<Radio classes={{root: classes.rootRadio}} checkedIcon={<div className={classes.radio}/>} />} 
                label="ALL COMPANIES THAT HAVEN'T ANSWERED THE SURVEY"
              />
              <FormControlLabel 
                value={'2'} 
                classes={{label: classes.label}} 
                control={<Radio classes={{root: classes.rootRadio}} checkedIcon={<div className={classes.radio}/>} />} 
                label="ALL COMPANIES THAT HAVE STARTED THE SURVEY BUT HAVEN'T FINISHED IT"
              />
            </RadioGroup>
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
                text="SEND REMINDER"
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

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
});

const mapDispatchToProps = ({

})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SendReminderModal));
