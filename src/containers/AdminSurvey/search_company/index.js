import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ReactTable from 'react-table'
import { Text, FlexView, Row } from '../../../styles/global';
import { Colors } from '../../../lib/theme';
import { CustomButton, CustomInput } from '../../../components';
import { surveyActions } from '../../../redux/actions';

const styles = {
  headerText: {
    color: Colors.gray,
    fontSize: 12,
    padding: '0px 5px',
    textAlign: 'left'
  },
  companyName: {
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
  filterInput: {
    marginLeft: 20
  }
}

class SurveySearchCompany extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actionIndex: 0,
      showPopOverView: false,
      popFormIndex: 0,
      selected: {},
      showFilter: false
    }
  }

  componentDidMount() {
    if(!this.props.loggedIn){
      this.props.redirectToLogin();
    } else {
      this.props.fetchCompanies();
    }
  }

  onLoadCompaniesExcel = () => {
    console.log('add survey');
  }

  toggleFilter = () => {
    this.setState({showFilter: !this.state.showFilter});
  }

  render() {
    const { showFilter } = this.state;
    const { classes, companies, screenWidth } = this.props;

    const cellStyle = {
      headerStyle: {height: 70, display: 'flex', alignItems: 'center'},
      style: {height: 70, display: 'flex', alignItems: 'center', padding: '0 10px'},
    }
    const columns = [
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>COMPANY</p>,
        Cell: props => <a className={classes.companyName}>{props.value}</a>,
        filterable: showFilter,
        filterMethod: (filter, row) => {
          console.log('fileter', row)
          return row.company.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
        },
        Filter: ({filter, onChange}) => (
          <Row style={{paddingLeft: 20}}>
          <CustomInput
            value={filter ? filter.value : ''}
            onChange={event => onChange(event.target.value)}
            style={{marginLeft: 20}}
          />
          </Row>
        ),
        accessor: 'company' // String-based value accessors!
      }, 
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>User name</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'username',
      }, 
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>Partner</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        filterable: showFilter,
        filterMethod: (filter, row) => {
          console.log('fileter', row)
          return row.partner.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
        },
        Filter: ({filter, onChange}) => (
          <Row style={{paddingLeft: 20}}>
          <CustomInput
            value={filter ? filter.value : ''}
            onChange={event => onChange(event.target.value)}
            style={{marginLeft: 20}}
          />
          </Row>
        ),
        accessor: 'partner' // Custom value accessors!
      }, 
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>User email</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'email'
      },
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>Revenue model</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        filterable: showFilter,
        filterMethod: (filter, row) => {
          console.log('fileter', row)
          return row.revenue_model.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
        },
        Filter: ({filter, onChange}) => (
          <Row style={{paddingLeft: 20}}>
          <CustomInput
            value={filter ? filter.value : ''}
            onChange={event => onChange(event.target.value)}
            style={{marginLeft: 20}}
          />
          </Row>
        ),
        accessor: 'revenue_model'
      },
      {
        ...cellStyle,
        minWidth: 200,
        Header: <p className={classes.headerText}>Sector</p>,
        Cell: props => <span className={classes.cell}>{props.value}</span>,
        accessor: 'sector'
      }
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
              Companies
            </Text>
          </Grid>
          <Grid item xs={12} md={4} style={{padding: 20}}>
            <FlexView justify="flex-end">
              <CustomButton
                color={Colors.lightgray}
                backgroundColor={Colors.blue}
                icon="arrow_downward"
                text="Load Companies Exel"
                onPress={this.onLoadCompaniesExcel}
                style={{margin: 0}}
              />
            </FlexView>
          </Grid>
        </Grid>
        <Grid container style={{paddingLeft: 20}}>
          <CustomButton
            text={showFilter ? 'Hide filter' : 'Show filter'}
            backgroundColor="transparent"
            color={Colors.text}
            fontSize={14}
            onPress={this.toggleFilter}            
          />
        </Grid>
        <Grid container style={{padding: 20}} className={classes.flexContainer}>
          <ReactTable
            data={companies}
            columns={columns}
            defaultPageSize={10}
            style={{width: '100%'}}
          />
        </Grid>        
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
  loggedIn: state.surveyReducer.loggedIn,
  companies: state.surveyReducer.companies
});

const mapDispatchToProps = ({
  fetchCompanies: surveyActions.fetchCompanies
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SurveySearchCompany));
