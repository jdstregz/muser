import React from 'react';
import { Grid, Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';

const Search = props => {
  const [search, setSearch] = React.useState('');
  const [searching, setSearching] = React.useState(false);

  const performSearch = () => {
    if (searching) {
      return;
    } else {
      setSearching(true);
    }
  };

  return (
    <Grid container spacing={1} justify={'space-between'} alignItems={'center'}>
      <Grid item xs={2}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Search
        </Typography>
      </Grid>
      <Grid item xs={8}>
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
            variant={'filled'}
            fullWidth
            onChange={event => setSearch(event.target.value)}
          />
        </div>
      </Grid>
      <Grid item xs={2}>
        <IconButton size={'medium'} onClick={performSearch} style={{ backgroundColor: '#fbba48' }}>
          {searching ? <CircularProgress style={{ color: '#4200d3' }} size={25} /> : <SearchIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Search;
