import React, { Fragment } from 'react';
import { Provider } from 'react-redux';

import FlashMessage from 'react-native-flash-message';

import './config/ReactotronConfig';
import './config/DevToolsConfig';

import store from './store';

import Routes from './routes';

const App = () => (
  <Fragment>
    <Provider store={store}>
      <Routes />
    </Provider>
    <FlashMessage position="top" />
  </Fragment>
);

export default App;
