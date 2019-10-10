import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Colors } from '../lib/theme';

const styles = {
  headerFillButton: {
    background: Colors.blue,
    color: 'white',
    borderRadius: 36,
    margin: 5
  },
  headerOutlineButton: {
    color: 'white',
    borderColor: 'white',
    borderRadius: 36,
    margin: 5
  },
};

class InitialScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  render() {
    return(
      <div>
        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            Welcome
          </Grid>
        </Grid>
      </div>      
    )
  }
}

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
});

const mapDispatchToProps = ({

})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InitialScreen));