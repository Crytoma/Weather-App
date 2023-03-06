import styled from 'styled-components';
import React from 'react';
import Media from 'react-media';
import Mobile from './Mobile/Mobile';
import Desktop from './Desktop';

export default class App extends React.Component {

  render() {
    return (
      <AppWrap>
        <Media query="(max-width: 768px)" render={() =>
        (
          <Mobile />
        )}
        />
        <Media query="(min-width: 769px)" render={() =>
        (
          <Desktop />
        )}
        />
      </AppWrap>
    )
  }
}

const AppWrap = styled.section`
    text-align: center;
    min-height: 100vh;
    
`;