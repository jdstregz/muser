import React from 'react';
import {Grid, IconButton, CircularProgress} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const SearchWidget = () => {
  const [searching, setSearching] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const performSearch = async () => {
    setSearching(true);
    const results = await axios.get('/api/search/' + search);

    console.log(results);
  };

  return (
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item xs={11}>
        <div style={{ marginRight: 16 }}>
          <TextField
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                performSearch();
              }
            }}
            InputProps={{
              inputProps: {
                style: {
                  backgroundColor: '#fff',
                },
              },
            }}
            variant={'outlined'}
            fullWidth
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </div>
      </Grid>
      <Grid item xs={1}>
        <IconButton size={'medium'} onClick={performSearch} style={{ backgroundColor: '#fbba48' }}>
          {searching ? <CircularProgress style={{ color: '#4200d3' }} size={25} /> : <Search />}
        </IconButton>
      </Grid>
    </Grid>
  )
};

export default SearchWidget;