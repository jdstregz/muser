import React from 'react';
import { Grid, Typography, Divider, Paper, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import useStyles from './styles/Settings.style';

const Settings = props => {
  const classes = useStyles();
  const { spotify } = props;

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography className={classes.text} variant={'h5'}>
          Settings
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={1} justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography variant={'h6'}>Connection</Typography>
            </Grid>
            <Grid item xs={12}>
              {spotify.spotifySessionActive ? (
                <Paper style={{ color: '#06ae0c' }}>
                  <Typography variant={'body1'}>Spotify Connection: Active</Typography>
                </Paper>
              ) : (
                <Button href={'/auth/spotify/login'}>Log in to spotify</Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    spotify: state.spotify,
  };
};

export default connect(mapStateToProps, null)(Settings);
