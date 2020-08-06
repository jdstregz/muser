import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './TrackInfo.styles';

const TrackInfo = ({ track }) => {
  const classes = useStyles();

  if (!track) {
    return null;
  }

  let albumImage = track.album.images[1].url;

  const buildTrackArtistString = (track) => {
    let artistString = '';
    for (const artist of track.artists) {
      artistString += artist.name + ', ';
    }
    return artistString.substr(0, artistString.length - 2);
  };

  return (
    <Grid container direction={'row'} spacing={1} justify={'flex-start'} alignItems={'center'}>
      <Grid item>
        <img style={{ height: 68, width: 68 }} src={albumImage} alt={'Album Artwork'} />
      </Grid>
      <Grid item>
        <Typography className={classes.songName}>{track.name}</Typography>
        <Typography className={classes.artistNames}>{buildTrackArtistString(track)}</Typography>
      </Grid>
    </Grid>
  );
};

export default TrackInfo;
