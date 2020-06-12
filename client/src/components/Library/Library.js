import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const Library = (props) => {
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Library
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          component={Link}
          to={'/saved-songs'}
          style={{ backgroundColor: '#25006c', padding: 16 }}
        >
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography style={{ color: '#e2e2e2' }}>Saved Songs</Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          component={Link}
          to={'/albums'}
          fullWidth
          style={{ backgroundColor: '#2c0093', padding: 16 }}
        >
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography style={{ color: '#e2e2e2' }}>Albums</Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          component={Link}
          to={'/playlists'}
          fullWidth
          style={{ backgroundColor: '#228f93', padding: 16 }}
        >
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography style={{ color: '#e2e2e2' }}>Playlists</Typography>
            </Grid>
          </Grid>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Library;
