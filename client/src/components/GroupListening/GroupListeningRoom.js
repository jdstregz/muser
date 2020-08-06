import React from 'react';
import { Grid, Typography, Box, Button } from '@material-ui/core';
import useStyles from './styles/GroupListeningRoom.styles';
import { useSelector } from 'react-redux';
import GroupMusic from './GroupMusic';
import Chat from './Chat';

const GroupListeningRoom = () => {
  const classes = useStyles();
  const groupListening = useSelector((state) => state.groupListening);
  const socket = useSelector((state) => state.socket);

  const leaveRoom = () => {
    socket.emit('leave room');
  };

  if (groupListening.room === false) {
    return (
      <Typography className={classes.title} variant={'h5'}>
        You're currently not in a group listening room. To enter a room, simply make one, or join a
        friends.
      </Typography>
    );
  } else if (!groupListening.room) {
    return <Typography className={classes.title}>Loading</Typography>;
  }
  return (
    <Box display={'flex'} flexDirection={'column'} height={'calc(100vh - 200px)'}>
      <Box>
        <Grid container justify={'center'} alignItems={'center'}>
          <Grid item xs={8}>
            <Typography className={classes.title} variant={'h4'}>
              {groupListening.room.roomName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.title} variant={'h5'}>
              Group Listening Room
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button variant={'contained'} onClick={leaveRoom}>
              Leave Room
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box flex={1}>
        <GroupMusic />
      </Box>
      <Box flex={1}>
        <Chat />
      </Box>
    </Box>
  );
};

export default GroupListeningRoom;
