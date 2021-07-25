// In App.js in a new project

import * as React from 'react';
import {StatusBar} from 'react-native';
import Main from './src/screens/Main';
import {ModalPortal} from 'react-native-modals';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#0066cc" barStyle="light-content" />
      <Main />
      <ModalPortal />
    </>
  );
};

export default App;
