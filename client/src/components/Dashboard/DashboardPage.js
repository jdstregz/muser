import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const DashboardPage = props => {
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
