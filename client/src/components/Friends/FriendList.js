import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Add } from '@material-ui/icons';
import axios from 'axios';

const FriendList = props => {
  const { results } = props;

  const sendInvite = () => {
    //const {data} = axios.post('')
  };

  return (
    <List style={{ backgroundColor: '#fff', borderRadius: 10 }}>
      {results.map(result => (
        <ListItem divider>
          <ListItemText primary={result.username} />
          <ListItemSecondaryAction>
            <IconButton onClick={sendInvite}>
              <Add />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default FriendList;
