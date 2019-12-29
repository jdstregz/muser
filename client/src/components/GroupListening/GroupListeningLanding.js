import React from 'react';
import { Grid, Typography, Button, GridList } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {getMyGroupListeningRooms, getPublicGroupListeningRooms} from '../../actions/groupListeningActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import {useHistory} from 'react-router-dom';

const GroupListeningLanding = props => {
  const [myRooms, setMyRooms] = React.useState([]);
  const [publicRooms, setPublicRooms] = React.useState([]);
  const [loadingRooms, setLoadingRooms] = React.useState(true);
  const [loadingPublicRooms, setLoadingPublicRooms] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    getMyGroupListeningRooms().then((rooms) => {
      setMyRooms(rooms);
      setLoadingRooms(false)
    });
    getPublicGroupListeningRooms().then(rooms => {
      setPublicRooms(rooms);
      setLoadingPublicRooms(false);
    })
  }, []);

  const enterRoom = (room) => {
    if (room._id) {
      history.push('/gl-room?id=' + room._id);
    }
  };

  const renderMyRooms = () => {
    if (myRooms.length === 0 && !loadingRooms) {
      return (
        <Typography variant={'caption'} style={{ color: '#fff' }}>
          ~ No Rooms ~
        </Typography>
      )
    } else if (myRooms.length > 0) {
      return (
        <GridList cols={3}>
          {myRooms.map((room) => (
            <GridListTile key={room._id} cols={1}>
              <Paper style={{borderRadius: 10, padding: 16}}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography>
                      Title: {room.title}
                    </Typography>
                    <Typography>
                      Description: {room.description}
                    </Typography>
                    <Typography>
                      Public: {room.public ? "True" : "False"}
                    </Typography>
                    <Typography>
                      Members: {room.users.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      onClick={() => enterRoom(room)}
                      variant={'contained'} style={{backgroundColor: '#5e9cff'}}>
                      Enter
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </GridListTile>
          ))}
        </GridList>
      )
    } else {
      return (
        <CircularProgress/>
      )
    }
  };

  const renderPublicRooms = () => {
    if (publicRooms.length === 0 && !loadingPublicRooms) {
      return (
        <Typography variant={'caption'} style={{ color: '#fff' }}>
          ~ No public rooms ~
        </Typography>
      )
    } else if (publicRooms.length > 0) {
      return (
        <GridList cols={3}>
          {publicRooms.map((room) => (
            <GridListTile key={room._id} cols={1}>
              <Paper style={{borderRadius: 10, padding: 16}}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography>
                      Title: {room.title}
                    </Typography>
                    <Typography>
                      Description: {room.description}
                    </Typography>
                    <Typography>
                      Public: {room.public ? "True" : "False"}
                    </Typography>
                    <Typography>
                      Members: {room.users.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      onClick={() => enterRoom(room)}
                      variant={'contained'} style={{backgroundColor: '#5e9cff'}}>
                      Enter
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </GridListTile>
          ))}
        </GridList>
      )
    }
  };

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={4}>
        <Typography variant={'h5'} style={{color: '#fff'}}>
          Group Listening
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Button component={Link} to={'/create-gl-room'} variant={'contained'} style={{backgroundColor: '#fff'}} fullWidth>
          Create Room
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant={'contained'} style={{backgroundColor: '#fff'}} fullWidth>
          Enter Via Passcode
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{color: '#fff'}}>
          My Rooms
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {renderMyRooms()}
      </Grid>
      <Grid item xs={12}>
        <Typography style={{color: '#fff'}}>
          Public Rooms
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {renderPublicRooms()}
      </Grid>
    </Grid>
  )
}

export default GroupListeningLanding;