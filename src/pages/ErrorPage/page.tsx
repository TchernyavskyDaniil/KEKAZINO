import * as React from 'react';
import styled from 'reshadow';

import errorImage from '@assets/images/404.jpg';

const Image = (): JSX.Element =>
  styled``(<img src={errorImage} alt="OOPS" title="Our application did not understand you" />);

export const ErrorPage: React.FC = () => {
  return <Image />;
};
