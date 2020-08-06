import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './styles/RoomList.styles';
import { useSelector } from 'react-redux';
import RoomTile from './RoomTile';

const RoomList = () => {
  const rooms = useSelector((state) => state.groupListening.availableRooms);
  const currentRoom = useSelector((state) => state.groupListening.room);
  const socket = useSelector((state) => state.socket);
  const classes = useStyles();

  React.useEffect(() => {
    // initialize room listener
    socket.emit('room updates');
    return () => {
      socket.emit('unsubscribe room updates');
    };
  }, [socket]);

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      {rooms.length === 0 ? (
        <Typography className={classes.statusText}>No Rooms</Typography>
      ) : (
        rooms.map((room, index) => (
          <Grid item xs={4} key={index}>
            <RoomTile room={room} currentRoom={currentRoom} socket={socket} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RoomList;
