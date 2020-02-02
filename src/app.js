import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from './getStore';

ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      <h1> hello world </h1>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
