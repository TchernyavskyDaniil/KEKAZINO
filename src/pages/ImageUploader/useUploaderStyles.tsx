import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { COLORS } from '@lib/constants';

export const useUploaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      height: '100vh',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: COLORS.MAIN_BACKGROUND,
    },
    button: {
      margin: theme.spacing(0, 2),
      minWidth: 120,
    },
    gridRoot: {
      marginTop: 14,
    },
    label: {
      marginTop: 14,
      marginLeft: 8,
    },
  }),
);
