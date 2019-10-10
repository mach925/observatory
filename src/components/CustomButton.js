import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Icon } from '@material-ui/core';
import { Colors } from '../lib/theme';
import { Row } from '../styles/global';

class CustomButton extends React.Component {

  render() {
    const { variant, text, backgroundColor, color, onPress, fontSize, loading, icon, style } = this.props;
    return(
      <Button 
        variant={variant} 
        size="small" 
        style={{
          backgroundColor,
          color,
          fontSize,
          marginTop: 20,
          marginBottom: 20,
          padding: '5px 12px',
          textTransform: 'none',
          ...style
        }}
        onClick={onPress}
      >
        <Row>
          {icon.length > 0 &&
             <Icon
              style={{
                color,
                fontSize: 20,
                marginRight: 10
              }}
             >
              {icon}
             </Icon>
          }
          {text}
          {loading && <CircularProgress style={{marginLeft: 20, color: Colors.lightgray}} size={12}/>}
        </Row>
      </Button>
    )
  }
}

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  variant: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  fontSize: PropTypes.number,
  loading: PropTypes.bool,
  style: PropTypes.object
};

CustomButton.defaultProps = {
  variant: 'contained',
  backgroundColor: 'primary',
  color: Colors.lightgray,
  fontSize: 16,
  loading: false,
  style: {},
  icon: ''
}

export default CustomButton;
