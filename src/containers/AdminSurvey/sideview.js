import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Text, CenterRow, SBView, SText } from '../../styles/global';
import { Colors } from '../../lib/theme';
import { MainLogoView } from '../../styles/signup';
import { LeftSideWrapper, LeftSideInnerView } from '../../styles/admin_survey';
import { ResponseView, IconButton } from '../../components';

const styles = ({
  button: {
    width: '100%',
    marginLeft: -10,
    padding: '0 10px',
    justifyContent: 'flex-start'
  },
  selectedButton: {
    width: '100%',
    marginLeft: -10,
    padding: '0 10px',
    justifyContent: 'flex-start',
    color: Colors.blue
  },
  tabIcon: {
    width: 30,
    height: 30,
    color: Colors.gray
  },
  sideContainer: {
    width: 240,
    padding: '15px 30px',
    height: '100%'
  }
})
class AdminSideView extends React.Component {

  onChangeIndex = (index, category) => {
    this.props.onChangeIndex(index, category);
    if(this.props.screenWidth < 640) this.props.hideSideView();
  }

  render() {
    const { visible, index, classes, screenWidth } = this.props;
    return(
      <LeftSideWrapper
        screenWidth={screenWidth}
        style={{
          marginLeft: visible ? 0 : -300,
        }}
      >
        <LeftSideInnerView>
          <SBView padding="0 0 40px 0">
            <CenterRow>
              <MainLogoView />
            </CenterRow>
            <ResponseView type="mobile" toggleWidth={640}>
              <IconButton
                icon="keyboard_backspace"
                backgroundColor={Colors.blue}
                color={Colors.lightgray}
                onPress={() => this.props.hideSideView()}
                margin={0}
              />
            </ResponseView>
          </SBView>
          <Button
            className={index === 1 ? classes.selectedButton : classes.button}
            onClick={() => this.onChangeIndex(1, 'dashboard')}
          >
            <SBView style={{width: '100%'}}>
              <SText>Dashboard</SText>
              <Icon className={classes.tabIcon}>home</Icon>
            </SBView>
          </Button>
          <Button
            className={index === 2 ? classes.selectedButton : classes.button}
            onClick={() => this.onChangeIndex(2, 'questionnaire')}
          >
            <SBView style={{width: '100%'}}>
              <SText>Questionnaire</SText>
              <Icon className={classes.tabIcon}>view_quilt</Icon>
            </SBView>
          </Button>
          <Button
            className={index === 3 ? classes.selectedButton : classes.button}
            onClick={() => this.onChangeIndex(3, 'search')}
          >
            <SBView style={{width: '100%'}}>
              <SText>Search company</SText>
              <Icon className={classes.tabIcon}>search</Icon>
            </SBView>
          </Button>
        </LeftSideInnerView>
      </LeftSideWrapper>
    )
  }
}

AdminSideView.propTypes = {
  visible: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
  hideSideView: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  screenWidth: state.screenReducer.width,
});

const mapDispatchToProps = ({

})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdminSideView));
