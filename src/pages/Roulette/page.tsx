import * as React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useRouletteStyles } from '@pages/Roulette/useRouletteStyles';

import { asyncSetTimeout, getRandomValueFromArray } from '@lib/utils';
import { DEFAULT_TIMEOUT_DELAY } from '@lib/constants';

import './styles.pcss';

interface SlotInterface {
  id: number;
  isDone: boolean;
  value: string | number | null;
}

const slotEffects = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const Roulette: React.FC = () => {
  const [isRollAnimation, setRollAnimationStatus] = React.useState<boolean>(false);
  const [firstSlot, setFirstSlot] = React.useState<SlotInterface>({
    id: 1,
    isDone: false,
    value: null,
  });
  const [secondSlot, setSecondSlot] = React.useState<SlotInterface>({
    id: 2,
    isDone: false,
    value: null,
  });
  const [thirdSlot, setThirdSlot] = React.useState<SlotInterface>({
    id: 3,
    isDone: false,
    value: null,
  });

  const slots = [firstSlot, secondSlot, thirdSlot];

  const onActiveRollAnimation = async () => {
    let newSlotEffects = [...slotEffects];

    setRollAnimationStatus(true);

    setFirstSlot({ ...firstSlot, isDone: false });
    setSecondSlot({ ...secondSlot, isDone: false });
    setThirdSlot({ ...thirdSlot, isDone: false });

    const firstSlotRandomValue = getRandomValueFromArray(newSlotEffects);
    await asyncSetTimeout(
      () =>
        setFirstSlot({
          id: 1,
          isDone: true,
          value: firstSlotRandomValue,
        }),
      DEFAULT_TIMEOUT_DELAY,
    );
    newSlotEffects = newSlotEffects.filter(slot => slot !== firstSlotRandomValue);

    const secondSlotRandomValue = getRandomValueFromArray(newSlotEffects);
    await asyncSetTimeout(
      () =>
        setSecondSlot({
          id: 2,
          isDone: true,
          value: secondSlotRandomValue,
        }),
      2000,
    );
    newSlotEffects = newSlotEffects.filter(slot => slot !== secondSlotRandomValue);

    const thirdSlotRandomValue = getRandomValueFromArray(newSlotEffects);
    await asyncSetTimeout(
      () =>
        setThirdSlot({
          id: 3,
          isDone: true,
          value: thirdSlotRandomValue,
        }),
      1000,
    );

    setRollAnimationStatus(false);
  };

  const classes = useRouletteStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.grid}>
        {slots.map(({ id, isDone, value }) => (
          <Grid key={id} item className={classes.gridContainer}>
            <div
              className={clsx('slots', {
                slots__animation: isRollAnimation && !isDone,
                slots__result: value && isDone,
              })}>
              {isDone && <span>{value}</span>}
              {!isDone && slotEffects.map(effect => <span key={effect}>{effect}</span>)}
            </div>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        disabled={isRollAnimation}
        onClick={onActiveRollAnimation}>
        Start Kekazino!
      </Button>
    </div>
  );
};
