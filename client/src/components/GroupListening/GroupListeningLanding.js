import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

const GroupListeningLanding = props => {

  const renderPublicRooms = () => {
    return (
      <Typography variant={'caption'} style={{color: '#fff'}}>
        ~ No Rooms ~
      </Typography>
    )
  }
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