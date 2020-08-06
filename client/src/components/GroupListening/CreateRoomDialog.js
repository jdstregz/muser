import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  Grid,
  Typography,
} from '@material-ui/core';
import GenericTextField from '../Generic/TextField';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const CreateRoomDialog = ({ open, onClose }) => {
  const [roomName, setRoomName] = React.useState('');
  const [passcode, setPasscode] = React.useState('');
  const [usePasscode, setUsePasscode] = React.useState(false);
  const [privateSetting, setPrivate] = React.useState(false);
  const [roomDescription, setRoomDescription] = React.useState('');
  const socket = useSelector((state) => state.socket);
  const history = useHistory();

  React.useEffect(() => {
    socket.emit('test');
    socket.on('response', () => {
      console.log('response received');
    });
  }, [socket]);

  const createNewRoom = () => {
    if (roomName && roomName.length > 0) {
      socket.emit('create room', {
        roomName,
        usePasscode,
        description: roomDescription,
        passcode,
        privateSetting,
      });
    }
    history.push({
      pathname: 'gl-room',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'md'}>
      <DialogTitle>Create Room</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} justify={'center'} alignItems={'center'}>
          <Grid item xs={12}>
            <GenericTextField
              label={'Room Name'}
              fullWidth
              value={roomName}
              valueChange={setRoomName}
            />
          </Grid>
          <Grid item xs={12}>
            <GenericTextField
              label={'Description'}
              value={roomDescription}
              fullWidth
              valueChange={setRoomDescription}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography>Private</Typography>
          </Grid>
          <Grid item xs={6}>
            <Checkbox checked={privateSetting} onChange={(e) => setPrivate(e.target.checked)} />
          </Grid>
          {privateSetting ? (
            <Grid item xs={12}>
              <Grid container spacing={1} justify={'center'} alignItems={'center'}>
                <Grid item xs={6}>
                  <Typography>Use Passcode</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Checkbox
                    checked={usePasscode}
                    onChange={(e) => setUsePasscode(e.target.checked)}
                  />
                </Grid>
                <Grid item xs={12}>
                  {usePasscode ? (
                    <GenericTextField
                      label={'Passcode'}
                      value={passcode}
                      valueChange={setPasscode}
                      type={'password'}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={createNewRoom}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomDialog;
