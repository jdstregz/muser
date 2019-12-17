import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: '#a4a4a4',
    borderRadius: 20,
    padding: theme.spacing(2),
  },
  profileImage: {
    width: 200,
  },
}));

export default useStyles;
