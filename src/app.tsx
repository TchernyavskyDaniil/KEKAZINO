import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import { history } from '@lib/browserHistory';

import StackPages from '@pages/StackPages';

import 'reset-css';

ReactDOM.render(
  <Router history={history}>
    <StackPages />
  </Router>,
  document.getElementById('root'),
);
