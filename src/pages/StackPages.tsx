import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ImageUploader } from '@pages/ImageUploader/ImageUploader';

export const StackPages: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/" component={ImageUploader} />
      <Redirect to="/" />
    </Switch>
  );
};
