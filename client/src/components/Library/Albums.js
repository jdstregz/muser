import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';

const Albums = (props) => {
  const [albums, setAlbums] = React.useState([]);
  const [requested, setRequested] = React.useState(true);

  React.useEffect(() => {
    axios.get('/api/music/albums').then(({data}) => {
      setAlbums(data);
      console.log(data);
    })
  }, [])

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{color: '#fff'}}>
          Albums
        </Typography>
      </Grid>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  )
};

export default Albums;