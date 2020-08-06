import React from 'react';
import { Grid, Typography, Box, Paper } from '@material-ui/core';
import Album from '../../assets/album.jpg';
import useStyles from './styles/GroupMusic.styles';
import { useSelector } from 'react-redux';
import FastAverageColor from 'fast-average-color';

const GroupMusic = () => {
  const classes = useStyles();
  const groupListening = useSelector((state) => state.groupListening);
  const [song, setSong] = React.useState('');
  const [artist, setArtist] = React.useState('');
  const [album, setAlbum] = React.useState('');
  const [albumArt, setAlbumArt] = React.useState(null);
  const [context, setContext] = React.useState('');
  const auth = useSelector((state) => state.auth);
  const imageBackground = React.useRef(null);
  const image = React.useRef(null);

  const parseArtists = (artists) => {
    let artistStringArray = [];
    artists.forEach((artist) => {
      artistStringArray.push(artist.name);
    });
    return artistStringArray.join(', ');
  };

  React.useEffect(() => {
    // TODO: make it so if the music update wasn't from the current user
    // then change the player
    if (groupListening && groupListening.lastMusicUpdate) {
      const currentTrack = groupListening.lastMusicUpdate.track_window
        ? groupListening.lastMusicUpdate.track_window.current_track
        : null;
      if (currentTrack) {
        setSong(currentTrack.name);
        setAlbum(currentTrack.album.name);
        setArtist(parseArtists(currentTrack.artists));
        setAlbumArt(currentTrack.album.images[0].url);
      }
    }
    console.log(imageBackground);
    if (imageBackground.current && image.current) {
      const fac = new FastAverageColor();
      console.log(fac);
      fac
        .getColorAsync(image.current)
        .then((color) => {
          imageBackground.current.style.backgroundColor = color.rgba;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [groupListening]);

  return (
    <Paper className={classes.root} display={'flex'} flexDirection={'column'} height={'100%'}>
      <Box>
        <Grid container justify={'center'} alignItems={'center'}>
          <Grid item xs={12}>
            <Typography className={classes.text}>Currently Playing:</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box display={'flex'} flexDirection={'row'} flex={1} ref={imageBackground}>
        <Grid container justify={'center'} alignItems={'center'} style={{ padding: 20 }}>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <img
              src={albumArt || Album}
              className={classes.albumImage}
              crossOrigin={'anonymous'}
              ref={image}
            />
          </Grid>
          <Grid item xs={6}>
            <Box display={'flex'} flexDirection={'column'}>
              <Typography className={classes.songTitle}>{song}</Typography>
              <Typography className={classes.text}>{artist}</Typography>
              <Typography className={classes.text}>{album}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box flex={1}>
        <Grid container spacing={1} justify={'center'} alignItems={'center'}>
          <Grid item xs={6}>
            <Grid container spacing={1} justify={'center'} alignItems={'center'}>
              <Grid item xs={12}>
                <Paper>Previous Song 1</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper>Previous Song 2</Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1} justify={'center'} alignItems={'center'}>
              <Grid item xs={12}>
                <Paper>Next Song 1</Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper>Next Song 2</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default GroupMusic;
