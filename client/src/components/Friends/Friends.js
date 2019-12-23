import React from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { fetchSession } from '../../actions/authActions';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import FriendList from './FriendList';

const Friends = props => {
  const { auth, fetchSession } = props;
  const [friendSearch, setFriendSearch] = React.useState('');
  const [friendResults, setFriendResults] = React.useState([]);
  const [searchLoading, setSearchLoading] = React.useState(false);

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
        {auth && auth.friends ? (
          auth.friends
        ) : (
          <Typography style={{ color: '#fff' }}>No friends</Typography>
        )}
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
              <FriendList results={friendResults} />
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
  };
};

export default connect(mapStateToProps, { fetchSession })(Friends);
