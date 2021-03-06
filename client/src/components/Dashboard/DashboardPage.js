import React from 'react';
import { Grid, Typography, Divider, Button } from '@material-ui/core';
import Backup from '../Utilities/Backup';
import { refreshToken } from '../../actions/authActions';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

const DashboardPage = (props) => {
  const { refreshToken } = props;
  const socket = useSelector((state) => state.socket);

  React.useEffect(() => {
    socket.emit('test');
  }, [socket]);

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Hello! Welcome to your Muser dashboard.
        </Typography>
        <Divider style={{ backgroundColor: '#fff' }} />
        <Typography style={{ color: '#fff', margin: 8 }}>
          This website is still under heavy development, so if you're reading this you are a beta
          tester.
        </Typography>
        <Typography style={{ color: '#fff', margin: 8 }}>
          Please do the following to protect any mistakes: Click the Backup spotify data. This will
          read all of your playlists, liked songs, and saved albums and print it to a text file.
          Once it's done please click "Download" to save it to your computer.
        </Typography>
        <Typography style={{ color: '#fff', margin: 8 }}>
          On the chance that something occurs to your spotify, you have a backup that I can use to
          restore your spotify playlists/albums/songs. This probably won't happen as I am very
          careful, but just in case.
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Backup />
      </Grid>
      <Grid item xs={6}>
        <Button variant={'contained'} onClick={() => refreshToken()}>
          Request Token Refresh
        </Button>
      </Grid>
    </Grid>
  );
};

export default connect(null, { refreshToken })(DashboardPage);
