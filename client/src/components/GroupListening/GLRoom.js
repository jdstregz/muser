import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {useLocation} from 'react-router';
import {getGroupListeningRoom} from '../../actions/groupListeningActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chat from './Chat';

const GLRoom = props => {
  const [room, setRoom] = React.useState(null);
  const location = useLocation();

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get('id');
    if (id) {
      getGroupListeningRoom(id).then((data) => {
        setRoom(data);
      });
    }
  }, []);

  if (!room) {
    return (<CircularProgress/>);
  }

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={4}>
        <Typography variant={'h5'} style={{color: '#fff'}}>
          {room.title}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography style={{color: '#fff'}}>
          {room.description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Chat/>
      </Grid>
    </Grid>
  )
}

export default GLRoom