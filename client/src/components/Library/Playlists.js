import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';

const Playlists = () => {
  const [playlists, setPlaylists] = React.useState([]);
  const [requested, setRequested] = React.useState(true);

  React.useEffect(() => {
    axios.get('/api/music/playlists').then(({ data }) => {
      setPlaylists(data);
      setRequested(false);
    });
  }, []);

  if (requested || !playlists) {
    return <div>Loading</div>;
  }
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Playlists
        </Typography>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Playlists;
