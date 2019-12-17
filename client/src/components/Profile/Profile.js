import React from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles/Profile.styles';

const Profile = props => {
  const { spotify, auth } = props;
  const ssa = spotify.spotifySessionActive;
  const classes = useStyles();
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography style={{ color: '#fff' }} variant={'h5'}>
          Profiles
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid container spacing={1} justify={'center'} alignItems={'center'}>
            <Grid item xs={12}>
              <Typography variant={'h6'}>Muser Profile</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography>Display Name: {auth.name}</Typography>
              <Typography>Username: {auth.username}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {ssa ? (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={1} justify={'center'} alignItems={'center'}>
              <Grid item xs={12}>
                <Typography variant={'h6'}>Spotify Profile</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <img className={classes.profileImage} alt={'Profile'} src={ssa.images[0].url} />
              </Grid>
              <Grid item xs={12}>
                <Typography>Display Name: {ssa.display_name}</Typography>
                <Typography>Username: {ssa.id}</Typography>
                <Typography>Email: {ssa.email}</Typography>
                <Typography>Followers: {ssa.followers.total}</Typography>
                <Typography>Product: {ssa.product}</Typography>
                <Typography>
                  Link: <a href={ssa.external_urls.spotify}>{ssa.external_urls.spotify}</a>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ) : null}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    spotify: state.spotify,
  };
};

export default connect(mapStateToProps, null)(Profile);
