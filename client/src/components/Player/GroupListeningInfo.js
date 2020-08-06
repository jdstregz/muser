import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { startPlayback, transferUsersPlayback } from '../../actions/musicActions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 10,
    textAlign: 'right',
    marginRight: theme.spacing(2),
    color: '#9d31ff',
  },
}));

const GroupListeningInfo = (props) => {
  const { player, deviceId, spotify } = props;
  const groupListening = useSelector((state) => state.groupListening);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();

  React.useEffect(() => {
    if (
      groupListening &&
      groupListening.lastMusicUpdate &&
      groupListening.lastMusicUpdate.track_window
    ) {
      const { current_track } = groupListening.lastMusicUpdate.track_window;
      if (current_track && groupListening.lastMusicUpdate.id.toString() !== auth._id.toString()) {
        console.log('CHANGE TRACK');
        if (spotify && spotify.spotifySessionActive && spotify.spotifySessionActive.token) {
          player.getCurrentState().then((state) => {
            if (!state) {
              // TODO: logic for playing a song from no list of songs;
              transferUsersPlayback(spotify.spotifySessionActive.token, deviceId).then(() => {
                console.log('transferred');
                startPlayback(
                  deviceId,
                  spotify.spotifySessionActive.token,
                  [current_track.uri],
                  groupListening.lastMusicUpdate.position,
                );
              });
            } else {
              startPlayback(
                deviceId,
                spotify.spotifySessionActive.token,
                [current_track.uri],
                groupListening.lastMusicUpdate.position,
              );
            }
          });
        }
        // TODO: ONLY CHANGE TRACK UNDER CERTAIN STATE COMPARISONS
      }
    }
  }, [groupListening]);

  return (
    <Link to={'/gl-room'}>
      <Typography className={classes.text}>
        {groupListening && groupListening.room
          ? `Currently squaded in "${groupListening.room.roomName}"`
          : ' '}
      </Typography>
    </Link>
  );
};

export default GroupListeningInfo;
