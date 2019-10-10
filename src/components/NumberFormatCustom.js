import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Colors } from '../lib/theme';

class NumberFormatCustom extends React.Component {

  addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  removeCommas(nStr) {
    return parseFloat(nStr.replace(/,/g,''));
  }

  onValueChange = (value) => {
    const { min, max } = this.props;
    let val = 0;
    if(this.removeCommas(value.value.toString()) < min) val = min;
    else if(this.removeCommas(value.value.toString()) > max) val = max;
    else val = value.value;
    val = this.removeCommas(val.toString());
    console.log(val);
    this.props.onChange({
      target: {
        value: isNaN(val) ? '' : val.toString()
      }
    });
  }

  render() {
    const { value, isCount, prefix, placeholder, questions } = this.props;
    return (
      <NumberFormat
        value={value}
        style={{
          width: '100%',
          height: 39,
          padding: '0px 14px',
          fontSize: 16,
          border: '1px solid #ced4da',
          borderRadius: 4,
          color: Colors.text
        }}
        onValueChange={this.onValueChange}
        thousandSeparator
        decimalScale={isCount ? 0 : 2}
        allowNegative={false}
        prefix={prefix ? questions.currency.value + ' ' : ''}
        placeholder={placeholder}
      />
    );
  }
}

NumberFormatCustom.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  isCount: PropTypes.bool,
  prefix: PropTypes.bool,
  placeholder: PropTypes.string
};

NumberFormatCustom.defaultProps = {
  min: -1,
  max: 999999999999999,
  isCount: true,
  prefix: false,
  placeholder: ''
}


const mapStateToProps = (state) => ({
  company_status: state.questionReducer.company_status,
  questions: state.questionReducer
});

export default connect(mapStateToProps, {})(NumberFormatCustom);
