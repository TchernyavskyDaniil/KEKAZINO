import * as React from 'react';
import { hot } from 'react-hot-loader';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';

import { ImageUploader } from '@pages/ImageUploader/page';
import { ErrorPage } from '@pages/ErrorPage/page';
import { Roulette } from '@pages/Roulette/page';

class StackPages extends React.Component<RouteComponentProps> {
  componentDidCatch() {
    const {
      history: { push },
    } = this.props;
    push('/404');
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ImageUploader} />
        <Route path="/404" component={ErrorPage} />
        {/* DELETE ROUTES UNDER COMMIT */}
        <Route path="/roulette" component={Roulette} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default hot(module)(withRouter(StackPages));
