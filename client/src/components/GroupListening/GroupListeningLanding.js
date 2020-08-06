import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import useStyles from './styles/GroupListeningLanding.styles';
import RoomList from './RoomList';
import CreateRoomDialog from './CreateRoomDialog';

const GroupListeningLanding = (props) => {
  const classes = useStyles();
  const [createRoomOpen, setCreateRoomOpen] = React.useState(false);

  return (
    <Grid container spacing={3} justify={'center'} alignItems={'center'}>
      <Grid item xs={4}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Group Listening
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          className={classes.button}
          fullWidth
          variant={'contained'}
          onClick={() => setCreateRoomOpen(true)}
        >
          Create Room
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button variant={'contained'} fullWidth className={classes.button}>
          Enter Via Passcode
        </Button>
      </Grid>
      <Grid item xs={12}>
        <RoomList />
      </Grid>
      <CreateRoomDialog open={createRoomOpen} onClose={() => setCreateRoomOpen(false)} />
    </Grid>
  );
};

export default GroupListeningLanding;
