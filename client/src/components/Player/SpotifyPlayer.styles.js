import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  root: {
    height: 65,
    backgroundColor: '#fff',
    paddingRight: theme.spacing(2),
  },
  playButtonContainer: {
    textAlign: 'center',
    height: 65,
  },
  trackInfoContainer: {
    height: 65,
  },
  playButton: {
    height: 30,
    width: 30,
  },
  actionButtons: {
    height: 25,
    width: 25,
  },
  subActionButtons: {
    height: 15,
    width: 15,
  },
  activeSubActionButton: {
    color: '#009101',
    height: 15,
    width: 15,
  },
  iconButton: {
    padding: 0,
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  songTimingSlider: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    color: '#080e16',
  },
  sliderText: {
    fontSize: 10,
    paddingBottom: 5,
    color: '#2c2c2c',
  },
  positionContainer: {
    height: 46,
  },
}));

export default styles;
