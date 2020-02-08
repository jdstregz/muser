import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flex: 1,
  },
  logo: {
    width: 100,
    marginRight: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  menuButton: {
    color: theme.palette.primary,
  },
  underline: {
    borderColor: '#919191',
  },
  toolbar: theme.mixins.toolbar,
  player: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    zIndex: 10000,
  },
}));

export default useStyles;
