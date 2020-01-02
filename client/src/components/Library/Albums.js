import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Albums = props => {
  const [albums, setAlbums] = React.useState([]);
  const [requested, setRequested] = React.useState(true);

  React.useEffect(() => {
    axios.get('/api/music/albums').then(({ data }) => {
      setAlbums(data);
      console.log(data);
    });
  }, []);

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={1}>
        <Button component={Link} to={'/library'} fullWidth style={{ backgroundColor: '#ff805a' }}>
          Back
        </Button>
      </Grid>
      <Grid item xs={11} style={{ textAlign: 'right' }}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Albums
        </Typography>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Albums;
