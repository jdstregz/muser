import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import libraryImage from '../../assets/images/undraw_music_r1se.svg';
import searchImage from '../../assets/images/undraw_compose_music_ovo2.svg';
import funImage from '../../assets/images/undraw_operating_system_4lr6.svg';
import operatorImage from '../../assets/images/undraw_having_fun_iais (1).svg';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    '&:hover': {
      backgroundColor: '#9f9f9f',
    },
    transition: '0.4s',
  },
}));

const MuseToolsLanding = () => {
  const history = useHistory();
  const styles = useStyles();

  const navigate = (path) => {
    history.push(path);
  };

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12} sm={6}>
        <Paper style={{ padding: 8 }} onClick={() => navigate('/library')} className={styles.paper}>
          <Typography>Library</Typography>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img style={{ maxHeight: 150 }} src={libraryImage} alt={'Library Image'} />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper style={{ padding: 8 }} onClick={() => navigate('/search')} className={styles.paper}>
          <Typography>Search</Typography>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img style={{ maxHeight: 150 }} src={searchImage} alt={'Library Image'} />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper
          style={{ padding: 8 }}
          onClick={() => navigate('/playlist-tools')}
          className={styles.paper}
        >
          <Typography>Playlist Tools</Typography>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img style={{ maxHeight: 150 }} src={funImage} alt={'Library Image'} />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper
          style={{ padding: 8 }}
          onClick={() => navigate('/group-listening')}
          className={styles.paper}
        >
          <Typography>Group Listening</Typography>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img style={{ maxHeight: 150 }} src={operatorImage} alt={'Library Image'} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MuseToolsLanding;
