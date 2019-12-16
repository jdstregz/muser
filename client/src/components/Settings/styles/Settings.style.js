import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  text: {
    color: '#fff',
  },
  divider: {
    backgroundColor: '#fff',
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

export default useStyles;
