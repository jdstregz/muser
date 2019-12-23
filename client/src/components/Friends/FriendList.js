import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Add, Check } from '@material-ui/icons';
import { sendFriendRequest } from '../../actions/userActions';
import { connect } from 'react-redux';

const FriendList = props => {
  const {
    you,
    results,
    currentFriends,
    outgoingRequests,
    incomingRequests,
    sendFriendRequest,
  } = props;

  const sendInvite = async result => {
    await sendFriendRequest({
      receiverId: result._id,
      receiverName: result.username,
    });
  };

  const checkIfFriendOrPending = user => {
    if (you && you._id) {
      if (you._id === user._id) {
        return true;
      }
    }
    if (currentFriends && currentFriends.length > 0) {
      let found = false;
      currentFriends.forEach(friend => {
        if (user._id === friend.userId) {
          found = true;
        }
      });
      if (found) {
        return true;
      }
    }
    if (outgoingRequests && outgoingRequests.length > 0) {
      let found = false;
      outgoingRequests.forEach(request => {
        if (request.receiver === user._id) {
          found = true;
        }
      });
      if (found) {
        return true;
      }
    }
    if (incomingRequests && incomingRequests.length > 0) {
      let found = false;
      incomingRequests.forEach(request => {
        if (request.sender === user._id) {
          found = true;
        }
      });
      if (found) {
        return true;
      }
    }
    return false;
  };

  return (
    <List style={{ backgroundColor: '#fff', borderRadius: 10 }}>
      {results.map((result, index) => {
        const showCheck = checkIfFriendOrPending(results[index]);
        console.log(showCheck);
        return (
          <ListItem divider key={result._id}>
            <ListItemText primary={result.username} />
            <ListItemSecondaryAction>
              {showCheck ? (
                <Check />
              ) : (
                <IconButton onClick={() => sendInvite(result)}>
                  <Add />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default connect(null, { sendFriendRequest })(FriendList);
