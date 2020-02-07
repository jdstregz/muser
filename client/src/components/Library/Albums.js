import React from 'react';
import { Grid, Typography, Button, List, ListItem } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Albums = props => {
  const [albums, setAlbums] = React.useState([]);
  const [requested, setRequested] = React.useState(true);

  React.useEffect(() => {
    axios.get('/api/music/albums').then(({ data }) => {
      setAlbums(data);
      setRequested(false);
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
      <Grid item xs={12}>
        <List style={{ backgroundColor: '#fff', padding: 16 }}>
          {albums.map(({ album }) => (
            <ListItem>
              <Grid container spacing={1} justify={'center'} alignItems={'center'}>
                <Grid item xs={6}>
                  <Typography>{album.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {album.artists && album.artists.length > 0 ? album.artists[0].name : null}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Albums;
