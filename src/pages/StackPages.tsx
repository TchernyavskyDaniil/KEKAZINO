import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ImageUploader } from '@pages/ImageUploader/ImageUploader';

class StackPages extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ImageUploader} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default hot(module)(StackPages);
