import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#ff5a39',
    },
  },
}));

const RoomTile = ({ room, currentRoom, socket }) => {
  const history = useHistory();
  const classes = useStyles();

  console.log(room);
  console.log(currentRoom);

  const isOurCurrentRoom = () => {
    if (currentRoom) {
      return room._id.toString() === currentRoom._id.toString();
    }
    return false;
  };

  const joinRoomAttempt = () => {
    socket.emit('join room', { roomId: room._id });
  };

  const handleRoomSelect = () => {
    if (isOurCurrentRoom()) {
      history.push('/gl-room');
    } else {
      joinRoomAttempt();
      history.push('/gl-room');
    }
  };

  return (
    <Paper className={classes.root} onClick={handleRoomSelect}>
      <Typography>{room.roomName}</Typography>
    </Paper>
  );
};

export default RoomTile;
