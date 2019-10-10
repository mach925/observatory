import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ReactTable from 'react-table'
import Moment from 'react-moment';
import { BlueSText, LText, Text, Row } from '../../../styles/global';
import { surveyActions } from '../../../redux/actions';
import { Colors } from '../../../lib/theme';
import { CustomInput, CustomButton } from '../../../components';

const styles = {
  flexContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    color: Colors.text,
    fontSize: 16,
    padding: '0px 5px',
    fontWeight: 'bold'
  },
  cell: {
    color: Colors.text,
    fontSize: 16,
    padding: '20px 0px',
    width: '100%',
    textAlign: 'center'
  },
  surveyName: {
    color: Colors.green,
    fontSize: 16,
    padding: '20px 5px',
  },
  paginationButton: {
    flex: 1,
    backgroundColor: Colors.blue,
    color: Colors.lightgray
  }
}

class SurveyDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    }
  }

  componentDidMount() {
    console.log('survey id: ', this.props.id);
    this.props.fetchSurveyDetail(this.props.id);
  }

  toggleFilter = () => {
    this.setState({showFilter: !this.state.showFilter});
  }

  render() {
    const { showFilter } = this.state;
    const { classes, survey_name, survey_detail } = this.props;

    const cellStyle = {
      headerStyle: {height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center'},
      style: {height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px'},
      getProps: (state, rowInfo) => ({
        style: {
          backgroundColor: (rowInfo !== undefined && rowInfo.viewIndex % 2 === 0? Colors.lightgray : null)
        },
      })
    }
    const columns = [
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>COMPANY</p>,
        Cell: props => <a className={classes.surveyName} href={"/admin/survey/detail/" + props.value}>{props.value}</a>,
        accessor: 'company' // String-based value accessors!
      },
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>Registered Email</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'email',
      },
      {
        ...cellStyle,
        minWidth: 100,
        Header: <p className={classes.headerText}>% Completion</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        filterable: showFilter,
        filterMethod: (filter, row) => {
          console.log('fileter', row)
          if(filter.value > row.percentage) return false;
          else return true;
        },
        Filter: ({filter, onChange}) => (
          <Row>
            <Text fontSize={20} padding="0 20px 0 0">{'>'}</Text>
            <CustomInput
              type="number"
              value={filter ? filter.value : ''}
              placeholder="min value"
              onChange={event => onChange(event.target.value)}
            />
          </Row>
        ),
        accessor: 'percentage' // Custom value accessors!
      },
      {
        ...cellStyle,
        minWidth: 100,
        Header: <p className={classes.headerText}>Completed</p>,
        Cell: props => <span className={classes.cell}>{props.value ? 'Yes' : 'No'}</span>,
        accessor: 'completed' // Custom value accessors!
      },
      {
        ...cellStyle,
        minWidth: 100,
        Header: <p className={classes.headerText}>Last saved at</p>,
        Cell: props => <Moment className={classes.cell} element={Text} format="DD/MM/YYYY" date={new Date(props.value)} />,
        accessor: 'updated' // Custom value accessors!
      },
    ]

    return(
      <Grid container className={classes.flexContainer} style={{padding: 20}}>
        <Grid container>
          <BlueSText><a href="/admin/survey/dashboard">Go back to surveys dashboard</a></BlueSText>
        </Grid>
        <Grid container>
          <LText>{survey_name}</LText>
        </Grid>
        <Grid container>
          <CustomButton
            text={showFilter ? 'Hide filter' : 'Show filter'}
            backgroundColor="transparent"
            color={Colors.text}
            fontSize={14}
            onPress={this.toggleFilter}
          />
        </Grid>
        <Grid container className={classes.flexContainer}>
          <ReactTable
            data={survey_detail}
            columns={columns}
            defaultPageSize={10}
            style={{width: '100%'}}
            previousText={
              <Text color={Colors.blue} align="center" fontSize={20}>Previous</Text>
            }
            nextText={
              <Text color={Colors.blue} align="center" fontSize={20}>Next</Text>
            }
          />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
  survey_detail: state.surveyReducer.survey_detail,
  survey_name: state.surveyReducer.survey_name,
});

const mapDispatchToProps = ({
  fetchSurveyDetail: surveyActions.fetchSurveyDetail
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SurveyDetail));
