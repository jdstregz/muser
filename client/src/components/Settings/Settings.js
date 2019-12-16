import React from 'react';
import { Grid, Typography, Divider, Paper, Button } from '@material-ui/core';
import useStyles from './styles/Settings.style';

const Settings = props => {
  const classes = useStyles();

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
              <Button href={'/auth/spotify/login'}>Log in to spotify</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Settings;
