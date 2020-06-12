import React from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import useStyles from './SongCard.styles';

const SongCard = (props) => {
  const { songObject, style } = props;
  const classes = useStyles();
  console.log(songObject);

  return (
    <Paper className={classes.root}>
      <Grid container justify={'center'} alignItems={'center'}>
        <Grid item xs={4}>
          <Typography>{songObject.track.name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SongCard;
