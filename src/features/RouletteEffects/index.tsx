import * as React from 'react';
import clsx from 'clsx';

import RootRef from '@material-ui/core/RootRef';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowForward from '@material-ui/icons/ArrowForward';

import { ROULETTE_SLOTS_EFFECTS } from '@lib/constants';

import { useRouletteStyles } from '@pages/Roulette/useRouletteStyles';

import { useRouletteSlots } from '@features/useRouletteSlots';

interface RouletteEffectsProps {
  handleOnClickToGoUploadPage: (
    ev: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export const RouletteEffects: React.FC<RouletteEffectsProps> = ({
  handleOnClickToGoUploadPage,
}) => {
  const gridRef = React.useRef<HTMLDivElement>();

  const classes = useRouletteStyles();
  const {
    isRollAnimation,
    slots,
    activeAnimationForSlots,
  } = useRouletteSlots();

  const slotsHeight = gridRef.current?.getBoundingClientRect().height;

  return (
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
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          disabled={isRollAnimation}
          onClick={activeAnimationForSlots}
          className={classes.button}>
          Start Kekazino!
        </Button>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<ArrowForward />}
          onClick={handleOnClickToGoUploadPage}
          className={classes.button}>
          Back
        </Button>
      </Grid>
    </>
  );
};
