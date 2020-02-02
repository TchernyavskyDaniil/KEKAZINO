import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.hydrate(
    <Router>
      <h1> hello world </h1>
    </Router>,
  document.getElementById('root'),
);
