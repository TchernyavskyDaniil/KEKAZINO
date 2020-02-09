import * as React from 'react';
import clsx from 'clsx';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RootRef from '@material-ui/core/RootRef';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useRouletteSlots } from '@features/useRouletteSlots';

import { useRouletteStyles } from '@pages/Roulette/useRouletteStyles';
import { $userImageUrl } from '@pages/ImageUploader/model';
import {
  $isImageUrlExist,
  setImageUrlExistStatus,
} from '@pages/Roulette/model';

import { ROULETTE_SLOTS_EFFECTS } from '@lib/constants';

import './styles.pcss';

export const Roulette: React.FC = () => {
  const gridRef = React.useRef<HTMLDivElement>();

  const {
    isRollAnimation,
    slots,
    activeAnimationForSlots,
  } = useRouletteSlots();
  const classes = useRouletteStyles();

  const imageUrl = useStore($userImageUrl);
  const isImageUrlExist = useStore($isImageUrlExist);

  const history = useHistory();

  React.useEffect(() => {
    const isImageSaved = imageUrl.length > 0;
    setImageUrlExistStatus(isImageSaved);
  }, []);

  const handleOnClickToGoUploadPage = () => {
    history.push('/');
  };

  const slotsHeight = gridRef.current?.getBoundingClientRect().height;

  return (
    <div className={classes.root}>
      {isImageUrlExist === null && <CircularProgress color="secondary" />}
      {isImageUrlExist && (
        <>
          <RootRef rootRef={gridRef}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.grid}>
              {slots.map(({ id, isDone, value }) => (
                <Grid key={id} item className={classes.gridContainer}>
                  <div className="slots__animation-wrapper">
                    <div
                      className={clsx('slots', {
                        'slots__animation-start': isRollAnimation && !isDone,
                        slots__result: value && isDone,
                        slots__start: !isRollAnimation && !isDone,
                      })}
                      style={{
                        height: isDone ? 'auto' : slotsHeight,
                      }}>
                      {isDone && <span>{value}</span>}
                      {!isDone &&
                        ROULETTE_SLOTS_EFFECTS.map(effect => (
                          <span key={effect}>{effect}</span>
                        ))}
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </RootRef>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            disabled={isRollAnimation}
            onClick={activeAnimationForSlots}>
            Start Kekazino!
          </Button>
        </>
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
