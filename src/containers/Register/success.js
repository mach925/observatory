import * as React from 'react';
import { BlueLText } from '../../styles/global';
import { Container } from '../../styles/invalid';

export default class SignUpSuccess extends React.Component {

  render() {
    return (
      <Container>
        <BlueLText>You have completed the survey successfully. Thanks!</BlueLText>
        {/* <GrayMText>
          Please <button onClick={() => window.history.back()}>return</button>
          to the previous page or visit <button onClick={() => this.props.history.push('/signup')}>SignUp Page</button>.
        </GrayMText> */}
      </Container>
    );
  }
}
