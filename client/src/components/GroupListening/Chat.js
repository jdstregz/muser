import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './styles/Chat.styles';

const Chat = () => {
  const classes = useStyles();
  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography className={classes.text}>Chat</Typography>
      </Grid>
    </Grid>
  );
};

export default Chat;
