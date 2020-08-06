import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    margin: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: '#35005e',
    flexDirection: 'column',
  },
  text: {
    color: '#fff',
  },
  songTitle: {
    color: '#fff',
    fontSize: 20,
  },
  artistName: {},
  albumImage: {
    objectFit: 'contain',
    maxHeight: 200,
  },
}));

export default styles;
