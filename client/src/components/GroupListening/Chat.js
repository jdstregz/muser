import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const Chat = props => {
  return (
    <Paper style={{backgroundColor: '#2f3463', padding: 8}}>
      <Grid container spacing={1} justify={'center'} alignItems={'center'}>
        <Grid item xs={12}>
          <Typography style={{color: '#fff'}}>
            Chat
          </Typography>
        </Grid>
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth variant={'filled'} InputProps={{inputProps: {style: {backgroundColor: '#fff'}}}}/>
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth style={{backgroundColor: '#69be42'}} variant={'contained'}>send</Button>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default Chat;