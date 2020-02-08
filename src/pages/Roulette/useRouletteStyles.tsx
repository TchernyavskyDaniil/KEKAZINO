// eslint-disable-next-line no-unused-vars
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { COLORS } from '@lib/constants';

export const useRouletteStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: COLORS.MAIN_BACKGROUND,
      flexGrow: 1,
    },
    grid: {
      width: '80%',
      height: '80%',
      justifyContent: 'space-around',
    },
    gridContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      height: '80%',
      position: 'relative',
      overflow: 'hidden',
    },
  }),
);
