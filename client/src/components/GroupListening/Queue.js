import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SearchWidget from '../Search/SearchWidget';

const Queue = props => {
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography style={{color: '#fff'}}>
          Queue
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Paper style={{padding: 16, borderRadius: 10, backgroundColor: '#fff'}}>
          <Typography>
            Now Playing:
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper style={{padding: 16, borderRadius: 10, backgroundColor: '#fff'}}>
         <Typography>
           Up Next:
         </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{padding: 16, borderRadius: 10, backgroundColor: '#fff'}}>
          <Typography>
            Search
          </Typography>
          <SearchWidget/>
        </Paper>
      </Grid>
    </Grid>
  )
};

export default Queue;