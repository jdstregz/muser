import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const Library = props => {
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Library
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper style={{ backgroundColor: '#25006c', padding: 16 }}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography style={{ color: '#9c9c9c' }}>Saved Songs</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper style={{ backgroundColor: '#2c0093', padding: 16 }}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography style={{ color: '#aeaeae' }}>Playlists</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button component={Link} to={"/albums"} fullWidth style={{ backgroundColor: '#2c0093', padding: 16 }}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography style={{ color: '#aeaeae' }}>Albums</Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
        <Grid item xs={12}>
            <Button component={Link} to={"/playlists"} fullWidth style={{ backgroundColor: '#228f93', padding: 16 }}>
                <Grid container justify={'center'} alignItems={'center'}>
                    <Grid item xs={12}>
                        <Typography style={{ color: '#aeaeae' }}>Playlists</Typography>
                    </Grid>
                </Grid>
            </Button>
        </Grid>
    </Grid>
  );
};

export default Library;
