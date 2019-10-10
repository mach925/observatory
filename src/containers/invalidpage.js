import * as React from 'react';
import { GrayMText } from '../styles/global';
import { Container } from '../styles/invalid';

export default class InvalidPage extends React.Component {

  render() {
    return (
      <Container>
        <GrayMText>{"This page doesn't exist"}</GrayMText>
        <GrayMText>
          Please <button onClick={() => window.history.back()}>return</button>
          to the previous page or visit <button onClick={() => this.props.history.push('/signup')}>SignUp Page</button>.
        </GrayMText>
      </Container>
    );
  }
}
