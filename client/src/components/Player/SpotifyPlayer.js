import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import useStyles from './SpotifyPlayer.styles';
import { getCurrentPlayback, transferUsersPlayback } from '../../actions/musicActions';

const SpotifyPlayer = (props) => {
  const [player, setPlayer] = React.useState(null);
  const [paused, setPaused] = React.useState(true);
  const [deviceId, setDeviceId] = React.useState(null);
  const spotify = useSelector((state) => state.spotify);
  const classes = useStyles();

  React.useEffect(() => {
    if (player) {
      player.connect();
    }
  }, [player]);

  const playerStateChanged = (state) => {
    console.log(state);
    setPaused(state.paused);
  };

  const checkForPlayer = () => {
    if (!player && spotify && spotify.spotifySessionActive && spotify.spotifySessionActive.token) {
      // TODO: sometimes this loads before the spotify sdk has loaded, create an interval for rechecking
      const { token } = spotify.spotifySessionActive;
      if (window.Spotify !== undefined) {
        console.log(window.Spotify);
        let player = new window.Spotify.Player({
          name: 'Muser Spotify Player',
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        player.addListener('initialization_error', ({ message }) => {
          console.error(message);
        });
        player.addListener('authentication_error', ({ message }) => {
          console.error(message);
        });
        player.addListener('account_error', ({ message }) => {
          console.error(message);
        });
        player.addListener('playback_error', ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener('player_state_changed', playerStateChanged);

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          setDeviceId(device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });
        setPlayer(player);
        console.log('setting player');
      }
    }
  };

  React.useEffect(() => {
    checkForPlayer();
  });

  const togglePlay = () => {
    if (player) {
      player.getCurrentState().then((state) => {
        if (!state) {
          // TODO: logic for playing a song from no list of songs;
          transferUsersPlayback(spotify.spotifySessionActive.token, deviceId).then(() => {
            console.log('transferred');
          });
        } else {
          player.togglePlay();
        }
      });
    }
  };

  console.log(paused);

  return (
    <div className={classes.root}>
      <Grid container justify={'center'} alignItems={'center'}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} className={classes.playButtonContainer}>
          <IconButton onClick={togglePlay}>
            {paused ? (
              <PlayArrow className={classes.playButton} />
            ) : (
              <Pause className={classes.playButton} />
            )}
          </IconButton>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
};

export default SpotifyPlayer;
