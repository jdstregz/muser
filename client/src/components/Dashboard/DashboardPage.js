import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Backup from '../Utilities/Backup';

const DashboardPage = props => {
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{ color: '#fff' }}>
          Dashboard
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Backup />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
