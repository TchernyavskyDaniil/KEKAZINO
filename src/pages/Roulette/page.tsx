import * as React from 'react';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useRouletteStyles } from '@pages/Roulette/useRouletteStyles';
import { $userImageUrl } from '@pages/ImageUploader/model';
import {
  $isImageUrlExist,
  setImageUrlExistStatus,
} from '@pages/Roulette/model';

import { RouletteEffects } from '@features/RouletteEffects';

import './styles.pcss';

export const Roulette: React.FC = () => {
  const classes = useRouletteStyles();

  const imageUrl = useStore($userImageUrl);
  const isImageUrlExist = useStore($isImageUrlExist);

  const history = useHistory();

  React.useEffect(() => {
    const isImageSaved = imageUrl.length > 0;
    setImageUrlExistStatus(isImageSaved);
  }, []);

  const handleOnClickToGoUploadPage = React.useCallback(() => {
    history.push('/');
  }, []);

  return (
    <div className={classes.root}>
      {isImageUrlExist === null && <CircularProgress color="secondary" />}
      {isImageUrlExist && (
        <RouletteEffects
          handleOnClickToGoUploadPage={handleOnClickToGoUploadPage}
        />
      )}
      {isImageUrlExist === false && (
        <>
          <p className="roulette__empty-image-url">
            {' '}
            Oops, we did not find saved image.{' '}
          </p>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOnClickToGoUploadPage}>
            Back to image upload page
          </Button>
        </>
      )}
    </div>
  );
};
