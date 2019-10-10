import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import ReactTable from 'react-table'
import Popover from 'react-popover';
import * as _ from 'lodash';
import { Grid, Icon, Button } from '@material-ui/core';
import { Text, FlexView, Row, GraySText } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { CustomButton, IconButton } from '../../../components';
import { surveyActions } from '../../../redux/actions';
import { PopOverView } from '../../../styles/admin_survey';
import NewCampaignModal from './modal_new_compaign';
import SendReminderModal from './modal_send_reminder';

const styles = {
  addButton: {
    padding: '0 10px',
    backgroundColor: Colors.blue
  },
  headerText: {
    color: Colors.gray,
    fontSize: 12,
    padding: '0px 5px',
    textAlign: 'left'
  },
  surveyName: {
    color: Colors.green,
    fontSize: 16,
    padding: '20px 5px'
  },
  cell: {
    color: Colors.text,
    fontSize: 16,
    padding: '20px 0px',
    width: '100%'
  },
  flexContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  popup: {
    padding: 5,
    position: 'relative',
    borderRadius: 4,
    backgroundColor: '#F2F2F2',
    border: '1px solid #E2E2E2'
  },
  popupIcon: {
    fontSize: 16,
    color: Colors.gray,
    marginRight: 20
  },
  popupTip: {
    position: 'absolute',
    top: -5,
    left: '50%',
    backgroundColor: '#F2F2F2',
    width: 8,
    height: 8,
    transform: 'rotate(45deg)',
    marginLeft: -4,
    borderTop: '1px solid #E2E2E2',
    borderLeft: '1px solid #E2E2E2',
  },
  popupButton: {
    padding: '0px 5px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start'
  }
}

class SurveyDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actionIndex: 0,
      showPopOverView: false,
      popFormIndex: 0,
      selected: {}
    }
  }

  componentDidMount() {
    if(!this.props.loggedIn){
      this.props.redirectToLogin();
    } else {
      this.props.fetchSurveys();
    }
  }

  onAddSurvey = () => {
    console.log('add survey');
    this.setState({
      showPopOverView: true,
      popFormIndex: 1
    })
  }

  onPressAction = (id) => {
    this.setState({actionIndex: id});
  }

  downloadSurvey = (id) => {
    console.log('Download Survey', this.props.surveys[id]);
  }

  sendReminderTo = (id) => {
    console.log('Send Reminder To', this.props.surveys[id]);
    this.setState({
      showPopOverView: true,
      popFormIndex: 2,
      selected: this.props.surveys[id]
    });
  }

  getSurveyName = (id) => {
    var obj = _.filter(this.props.surveys, function(o) {
      return o.id === id;
    });
    return obj[0].name;
  }

  render() {
    const { actionIndex, showPopOverView, popFormIndex, selected } = this.state;
    const { classes, surveys, screenWidth } = this.props;

    const cellStyle = {
      headerStyle: {height: 70, display: 'flex', alignItems: 'center'},
      style: {height: 70, display: 'flex', alignItems: 'center', padding: '0 10px'},
    }
    const columns = [
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>SURVEY NAME</p>,
        Cell: props => <a className={classes.surveyName} href={"/admin/survey/detail?id=" + props.value}>{this.getSurveyName(props.value)}</a>,
        accessor: 'id' // String-based value accessors!
      }, 
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>PARTNER</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'partner',
      }, 
      {
        ...cellStyle,
        minWidth: 80,
        Header: <p className={classes.headerText}>VISITS</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'visits' // Custom value accessors!
      }, 
      {
        ...cellStyle,
        minWidth: 100,
        Header: (
          <div>
            <p className={classes.headerText}>INCOMPLETED</p>
            <p className={classes.headerText}>SURVEYS</p>
          </div>
        ),
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'incompleted_surveys'
      },
      {
        ...cellStyle,
        minWidth: 100,
        Header: (
          <div>
            <p className={classes.headerText}>COMPLETED</p>
            <p className={classes.headerText}>SURVEYS</p>
          </div>
        ),
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'completed_surveys'
      },
      {
        ...cellStyle,
        minWidth: 100,
        Header: (
          <div>
            <p className={classes.headerText}>RATE OF</p>
            <p className={classes.headerText}>RESPONSE</p>
          </div>
        ),
        Cell: props => <span className={classes.cell}>{props.value + '%'}</span>,
        accessor: 'rate_of_response'
      },
      {
        ...cellStyle,
        minWidth: 100,
        Header: <span className={classes.headerText}>AVG TIME</span>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'average_time'
      },
      {
        ...cellStyle,
        minWidth: 150,
        Header: <span className={classes.headerText}>CREATED ON</span>,
        Cell: props => <Moment className={classes.cell} element={Text} format="DD MMM YYYY" date={new Date(props.value)} />,
        accessor: 'created'
      },
      {
        ...cellStyle,
        minWidth: 150,
        Header: <span className={classes.headerText}>ACTIONS</span>,
        sortable: false,
        Cell: props => (
          <Popover
            isOpen={actionIndex === props.value}
            preferPlace="start" // preferred position
            place="below"
            tipSize={0.1}
            onOuterAction={() => this.setState({ actionIndex: -1 })}
            body={
              <div className={classes.popup}>
                <div>
                  <Button className={classes.popupButton} onClick={() => this.downloadSurvey(props.value)}>
                    <Row>
                      <Icon className={classes.popupIcon}>save_alt</Icon>
                      <GraySText> Download results</GraySText>
                    </Row>
                  </Button>
                </div>
                <div>
                  <Button className={classes.popupButton} onClick={() => this.sendReminderTo(props.value)}>
                    <Row>
                      <Icon className={classes.popupIcon}>send</Icon>
                      <GraySText> Send reminder</GraySText>
                    </Row>
                  </Button>
                </div>
                <div className={classes.popupTip} />
              </div>
            }            
          >       
            <IconButton icon="more_horiz" backgroundColor="transparent" color={Colors.gray} onPress={() => this.onPressAction(props.value)}/>
          </Popover>   
        ),
        accessor: 'id'
      },
    ]

    return(
      <Grid container className={classes.flexContainer}>
        <Grid container justify="space-between" style={{alignItems: 'center'}}>
          <Grid item xs={12} md={4}>
            <Text
              fontSize={screenWidth < 640 ? 30 : 40}
              color={Colors.text}
              padding="20px"
            >
              Survey
            </Text>
          </Grid>
          <Grid item xs={12} md={4} style={{padding: 20}}>
            <FlexView justify="flex-end">
              <CustomButton
                color={Colors.lightgray}
                backgroundColor={Colors.blue}
                icon="add"
                text="New survey"
                onPress={this.onAddSurvey}
                style={{margin: 0}}
              />
            </FlexView>
          </Grid>
        </Grid>
        <Grid container style={{padding: 20}} className={classes.flexContainer}>
          <ReactTable
            data={surveys}
            columns={columns}
            defaultPageSize={10}
            style={{width: '100%'}}
          />
        </Grid>
        {
          showPopOverView &&
          <PopOverView>
            { popFormIndex === 1 && 
              <NewCampaignModal 
                onClose={() => this.setState({popFormIndex: 0, showPopOverView: false})} 
              />
            }
            { popFormIndex === 2 && 
              <SendReminderModal
                survey={selected}
                onClose={() => this.setState({popFormIndex: 0, showPopOverView: false})} 
              />
            }
          </PopOverView>
        }
        
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
  surveys: state.surveyReducer.surveys,
  loggedIn: state.surveyReducer.loggedIn
});

const mapDispatchToProps = ({
  fetchSurveys: surveyActions.fetchSurveys
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SurveyDashboard));
