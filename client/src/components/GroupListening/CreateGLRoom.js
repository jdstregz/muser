import React from 'react';
import {Grid, Typography, Button, TextField, Divider, Checkbox} from '@material-ui/core';
import {createGroupListeningRoom} from '../../actions/groupListeningActions';
import {useHistory} from 'react-router';
import FormHelperText from '@material-ui/core/FormHelperText';

const CreateGLRoom = props => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [publicRoom, setPublicRoom] = React.useState(false);
  const [validations, setValidations] = React.useState({});
  const [requested, setRequested] = React.useState(false);
  const history = useHistory();

  const validateFields = () => {
    console.log('validating Fields')
    const valids = {}
    if (!title) {
      valids.title = "Missing title."
    }
    if (!description) {
      valids.description = "Missing description"
    }
    setValidations(valids);
    return Object.keys(valids).length === 0;
  };

  const createRoom = async () => {
    console.log('creating room')
    if (requested) {
      console.log('alreadyRequested')
      return;
    }
    setRequested(true);
    if (validateFields()) {
      try {
        const data = await createGroupListeningRoom({
          title,
          description,
          public: publicRoom
        });
        setRequested(false)
        history.push(`/gl-room?id=${data._id}`, {room: data});
      } catch (err) {
        // TODO: show some error catch
        setRequested(false)
      }
    } else {
      setRequested(false)
    }
  };

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{color: '#fff'}}>
          Create Group Listening Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider style={{backgroundColor: '#fff'}}/>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{color: '#fff'}}>
          Title
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField InputProps={{inputProps: {style:{
          backgroundColor: '#fff'
            }}}} fullWidth variant={'filled'}
                   value={title}
                   onChange={(event) => setTitle(event.target.value)}
        />
        {validations.title  ?
          <FormHelperText style={{color: '#ff7a6e'}}>
            {validations.title}
          </FormHelperText>
          : null}
      </Grid>
      <Grid item xs={12}>
        <Typography style={{color: '#fff'}}>
          Description
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField InputProps={{inputProps: {style:{
              backgroundColor: '#fff'
            }}}} fullWidth variant={'filled'}
                   value={description}
                   onChange={(event) => setDescription(event.target.value)}
        />
        {validations.description ?
          <FormHelperText style={{color: '#ff7a6e'}}>
            {validations.description}
          </FormHelperText>
          : null
        }
      </Grid>
      <Grid item xs={12}>
        <Typography style={{color: '#fff'}}>
          Public: <Checkbox style={{color: '#fff'}}
                            onChange={event => setPublicRoom(event.target.value)}
                            value={publicRoom}
        />

        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Button variant={'contained'} fullWidth
                style={{backgroundColor: '#ff8784'}}>
          Cancel
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant={'contained'} fullWidth
                style={{backgroundColor: '#94ff86'}}
                onClick={createRoom}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateGLRoom;