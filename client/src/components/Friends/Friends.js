import React from 'react';
import {
  Grid,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  ListItem,
  List,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { fetchSession } from '../../actions/authActions';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import FriendList from './FriendList';

const Friends = props => {
  const { auth, fetchSession, requests } = props;
  const [friendSearch, setFriendSearch] = React.useState('');
  const [friendResults, setFriendResults] = React.useState([]);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const outgoingRequests =
    requests && requests.outgoingFriendRequests ? requests.outgoingFriendRequests : [];
  const incomingRequests =
    requests && requests.incomingFriendRequests ? requests.incomingFriendRequests : [];

  React.useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const searchForUsers = async username => {
    setFriendSearch(username);
    setSearchLoading(true);
    const { data } = await axios.post('/api/user/search/friends', { search: username });
    setFriendResults(data);
    setSearchLoading(false);
  };

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'flex-start'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Friends
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={1} justify={'center'} alignItems={'center'}>
          <Grid item xs={12}>
            {auth && auth.friends ? (
              auth.friends
            ) : (
              <Typography style={{ color: '#fff' }}>No friends</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: '#fff' }}>Outgoing Requests</Typography>
          </Grid>
          <Grid item xs={12}>
            {outgoingRequests && outgoingRequests.length > 0 ? (
              <List style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                {outgoingRequests.map(request => (
                  <ListItem>
                    <ListItemText primary={request.receiver} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Cancel />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography style={{ color: '#fff' }}>None</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ color: '#fff' }}>Incoming Requests</Typography>
          </Grid>
          <Grid item xs={12}>
            {incomingRequests && incomingRequests.length > 0 ? (
              <List style={{ backgroundColor: '#fff', borderRadius: 10 }}>
                {incomingRequests.map(request => (
                  <ListItem>
                    <ListItemText primary={request.receiver} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <Cancel />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography style={{ color: '#fff' }}>None</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={1} justify={'center'} alignItems={'center'}>
          <Grid item xs={12}>
            <Typography style={{ color: '#fff' }}>Search for friends</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant={'filled'}
              InputProps={{
                inputProps: {
                  style: {
                    backgroundColor: '#fff',
                  },
                },
              }}
              fullWidth
              value={friendSearch}
              onChange={event => searchForUsers(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {friendResults && friendSearch && !searchLoading && friendResults.length > 0 ? (
              <FriendList
                you={auth}
                outgoingRequests={outgoingRequests}
                incomingRequests={incomingRequests}
                currentFriends={auth.friends}
                results={friendResults}
              />
            ) : (
              <Typography style={{ color: '#fff' }}>
                {friendSearch && !searchLoading ? 'No results' : ''}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    requests: state.requests,
  };
};

export default connect(mapStateToProps, { fetchSession })(Friends);
