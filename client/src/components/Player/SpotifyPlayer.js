import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  Shuffle,
  Repeat,
  RepeatOne,
  VolumeDown,
  VolumeUp,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { refreshToken } from '../../actions/authActions';
import useStyles from './SpotifyPlayer.styles';
import { cycleRepeatMode, toggleShuffle, transferUsersPlayback } from '../../actions/musicActions';
import TrackInfo from './TrackInfo';
import Slider from '@material-ui/core/Slider';
import useInterval from '../Utilities/useInterval';
import { REPEAT_CONTEXT, REPEAT_OFF, REPEAT_TRACK } from '../../actions/types';
import GroupListeningModule from './GroupListeningInfo';

const SpotifyPlayer = (props) => {
  const { refreshToken } = props;
  const [player, setPlayer] = React.useState(null);
  const [volume, setVolume] = React.useState(50);
  const [paused, setPaused] = React.useState(true);
  const [truePosition, setTruePosition] = React.useState(null);
  const [position, setPosition] = React.useState(null);
  const [shuffle, setShuffle] = React.useState(false);
  const [duration, setDuration] = React.useState(null);
  const [playerState, setPlayerState] = React.useState(null);
  const [repeat, setRepeat] = React.useState('off');
  const [track, setTrack] = React.useState(null);
  const [deviceId, setDeviceId] = React.useState(null);
  const [tick, setTick] = React.useState(null);
  const [secondInterval, setSecondInterval] = React.useState(null);
  const spotify = useSelector((state) => state.spotify);
  const socket = useSelector((state) => state.socket);
  const classes = useStyles();

  React.useEffect(() => {
    if (player) {
      player.connect();
    }
  }, [player]);

  useInterval(() => {
    setPosition(position + 1);
  }, tick);

  useInterval(
    () => {
      checkForPlayer();
    },
    player ? null : 1000,
  );

  useInterval(() => {
    setTruePosition(truePosition + 1000);
  }, secondInterval);

  const enableSecondInterval = (value) => {
    setSecondInterval(value ? 1000 : null);
  };

  const playerStateChanged = (state) => {
    console.log(state);
    if (state != null) {
      setPlayerState(state);
      setPaused(state.paused);
      if (state.track_window) {
        setTrack(state.track_window.current_track);
      }
      if (state.position != null && state.duration != null) {
        let calcPosition = Math.floor((state.position / state.duration) * 1000);
        setPosition(calcPosition);
        setTruePosition(state.position);
        setDuration(state.duration);
        if (!state.paused) {
          const calcTick = Math.floor(state.duration / 1000);
          enableSecondInterval(true);
          setTick(calcTick);
        } else {
          enableSecondInterval(false);
          setTick(null);
        }
      }
      // set repeat
      if (state.repeat_mode != null) {
        switch (state.repeat_mode) {
          case REPEAT_OFF:
            setRepeat('off');
            break;
          case REPEAT_CONTEXT:
            setRepeat('context');
            break;
          case REPEAT_TRACK:
            setRepeat('track');
            break;
          default:
            setRepeat('off');
        }
      }
      if (state.shuffle != null) {
        setShuffle(state.shuffle);
      }
      console.log(socket);
      socket.emit('music update', state);
    }
  };

  const checkForPlayer = () => {
    console.log('checkingForPlayer');
    console.log(spotify);
    if (!player && spotify && spotify.spotifySessionActive && spotify.spotifySessionActive.token) {
      const { token } = spotify.spotifySessionActive;
      console.log(window.Spotify);
      if (window.Spotify !== undefined) {
        console.log(window.Spotify);
        let player = new window.Spotify.Player({
          name: 'Muser Spotify Player',
          getOAuthToken: async (cb) => {
            const { updatedAt } = spotify.spotifySessionActive;
            console.log(updatedAt);
            if (Date.now() - updatedAt > 1800000) {
              console.log(Date.now() - updatedAt);
              console.log('refreshing token');
              const data = await refreshToken();
              cb(data.token);
            } else {
              console.log(Date.now());
              console.log(updatedAt);
              console.log(Date.now() - updatedAt);
              console.log('token is fine so we gucci');
              cb(token);
            }
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

  const nextTrack = () => {
    if (player) {
      player.getCurrentState().then((state) => {
        if (!state) {
          // TODO: logic for playing a song from no list of songs;
          transferUsersPlayback(spotify.spotifySessionActive.token, deviceId).then(() => {
            console.log('transferred');
          });
        } else {
          player.nextTrack();
        }
      });
    }
  };

  const previousTrack = () => {
    player.getCurrentState().then((state) => {
      if (!state) {
        // TODO: logic for playing a song from no list of songs;
        transferUsersPlayback(spotify.spotifySessionActive.token, deviceId).then(() => {
          console.log('transferred');
        });
      } else {
        // If user has not finished the song yet then we just want to restart the song
        if (state.position / 1000 > 5) {
          player.seek(0).then(() => {
            console.log('started song over');
          });
        } else {
          player.previousTrack();
        }
      }
    });
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    console.log(newValue);
  };

  const handleVolumeFullyChanged = (event, newValue) => {
    player.getCurrentState().then((state) => {
      if (state) {
        player.setVolume(newValue / 100);
      }
    });
  };

  const handlePositionChange = (event, newValue) => {
    setPosition(newValue);
    console.log(newValue);
  };

  const handlePositionFullyChanged = (event, newValue) => {
    player.getCurrentState().then((state) => {
      if (state) {
        let calcPosition = Math.floor((newValue / 1000) * duration);
        player.seek(calcPosition).then(() => {
          console.log('ChangedPosition');
        });
      }
    });
  };

  const toggleRepeat = () => {
    if (playerState) {
      cycleRepeatMode(spotify.spotifySessionActive.token, repeat);
    }
  };

  const shuffleToggle = () => {
    if (playerState) {
      toggleShuffle(spotify.spotifySessionActive.token, !shuffle);
    }
  };

  const positionValue = () => {
    let ch = 60 * 60 * 1000;
    let h = Math.floor(truePosition / ch);
    let m = Math.floor((truePosition - h * ch) / 60000);
    let s = Math.floor((truePosition - h * ch - m * 60000) / 1000);
    if (!h) {
      return `${m}:${s.toString().padStart(2, '0')}`;
    } else {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
  };

  const durationValue = () => {
    let ch = 60 * 60 * 1000;
    let h = Math.floor(duration / ch);
    let m = Math.floor((duration - h * ch) / 60000);
    let s = Math.floor((duration - h * ch - m * 60000) / 1000);
    if (!h) {
      return `${m}:${s.toString().padStart(2, '0')}`;
    } else {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container justify={'center'} alignItems={'center'}>
        <Grid item xs={4} className={classes.trackInfoContainer}>
          <TrackInfo track={track} />
        </Grid>
        <Grid item xs={4} className={classes.playButtonContainer}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <IconButton className={classes.iconButton} onClick={shuffleToggle}>
                <Shuffle
                  className={shuffle ? classes.activeSubActionButton : classes.subActionButtons}
                />
              </IconButton>
              <IconButton className={classes.iconButton} onClick={previousTrack}>
                <SkipPrevious className={classes.actionButtons} />
              </IconButton>
              <IconButton className={classes.iconButton} onClick={togglePlay}>
                {paused ? (
                  <PlayArrow className={classes.playButton} />
                ) : (
                  <Pause className={classes.playButton} />
                )}
              </IconButton>
              <IconButton className={classes.iconButton} onClick={nextTrack}>
                <SkipNext className={classes.actionButtons} />
              </IconButton>
              <IconButton className={classes.iconButton} onClick={toggleRepeat}>
                {repeat === 'track' ? (
                  <RepeatOne className={classes.activeSubActionButton} />
                ) : (
                  <Repeat
                    className={
                      repeat === 'context'
                        ? classes.activeSubActionButton
                        : classes.subActionButtons
                    }
                  />
                )}
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Grid
                className={classes.positionContainer}
                container
                spacing={2}
                justify={'center'}
                alignItems={'center'}
              >
                <Grid item xs={2} md={1}>
                  <Typography className={classes.sliderText}>{positionValue()}</Typography>
                </Grid>
                <Grid item xs={8} md={10}>
                  <Slider
                    min={0}
                    max={1000}
                    className={classes.songTimingSlider}
                    value={position}
                    onChange={handlePositionChange}
                    onChangeCommitted={handlePositionFullyChanged}
                  />
                </Grid>
                <Grid item xs={2} md={1}>
                  <Typography className={classes.sliderText}>{durationValue()}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justify={'flex-end'} alignItems={'center'}>
            <Grid item>
              <VolumeDown style={{ width: 15, height: 15 }} />
            </Grid>
            <Grid item>
              <Slider
                style={{ width: 100, color: '#4a4a4a' }}
                value={volume}
                onChange={handleVolumeChange}
                onChangeCommitted={handleVolumeFullyChanged}
              />
            </Grid>
            <Grid item>
              <VolumeUp style={{ width: 15, height: 15 }} />
            </Grid>
            <Grid item xs={12}>
              <GroupListeningModule spotify={spotify} player={player} deviceId={deviceId} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(null, { refreshToken })(SpotifyPlayer);
