import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';

const About = () => {
  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        <Typography variant={'h5'} style={{ color: '#909090' }}>
          About
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ color: '#b4b4b4' }}>
          Hiya how's it going, welcome to Muser. My name is Josh, a.k.a. DJ Stregz. I have this
          vision of creating an online social media platform based around music. Spotify, Apple
          Music, and Soundcloud are great and all, but I think they could have a little bit more
          functionality allowing users to group up to share, discover, and listen to music together.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ color: '#b4b4b4' }}>
          So how do I anticipate this thing to work? We'll if you're reading this right now it means
          that the platform isn't done yet and you are a beta tester. So ideally i'd like to
          implement the following, and I'll write down a DONE next to each one that is done, and a
          TODO next to the items that are yet to be completed.
        </Typography>
        <Divider variant={'middle'} style={{ margin: 8, backgroundColor: '#fff' }} />

        <Typography style={{ color: '#b4b4b4' }}>
          DONE - Logging in/ creating an account and connecting spotify
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          DONE - Profile Page showing your connected spotify account
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          DONE - About page giving a little greeting
        </Typography>
        <Divider variant={'middle'} style={{ margin: 8, backgroundColor: '#fff' }} />
        <Typography style={{ color: '#b4b4b4' }}>
          TODO - Create a dashboard showing "Song of the Day", user's playlists and recent listens,
          and other fun stuff
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          TODO - Add friends by searching for their username
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          TODO - Allow user to listen to music on the platform
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          TODO - Allow users to download backups of their playlists
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          TODO - Allow user to search for music, albums, playlists, etc
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          TODO - Allow user to curate playlists using the seed generator endpoint
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          TODO - Allow users to use legacy muse-tools playlist makers
        </Typography>
        <Typography style={{ color: '#b4b4b4' }}>
          TODO - Allow users to enter a chatroom together and listen to music at the same time
        </Typography>

        <Divider variant={'middle'} style={{ margin: 8, backgroundColor: '#fff' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ color: '#b4b4b4' }}>
          This project is completely free out of the goodness of my heart (and also i can't sell
          anything since I'm using Spotify's data). But if you enjoy the service and want to donate,
          you can do so via: [insert my paypal/venmo here]. If you have any questions, concerns, or
          just want to say wassup, feel free to send a message below. Thanks for using Muser!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default About;
