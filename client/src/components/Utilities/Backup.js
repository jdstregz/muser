import React from 'react';
import { Grid, Button } from '@material-ui/core';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

const Backup = props => {
  const [requested, setRequested] = React.useState(false);
  const [backupData, setBackupData] = React.useState(null);
  const [clicked, setClicked] = React.useState(false);
  const { auth } = props;

  const backup = async () => {
    if (requested) {
      return;
    }
    setRequested(true);
    const { data } = await axios.get('/api/music/all-data');
    let json = JSON.stringify(data);
    json = [json];
    let blob = new Blob(json, { type: 'text/plain;charset=utf-8' });
    let url = window.URL || window.webkitURL;
    let link = url.createObjectURL(blob);
    setBackupData(link);
    setRequested(false);
  };

  return (
    <Grid container spacing={1} justify={'center'} alignItems={'center'}>
      <Grid item xs={12}>
        {!requested && !backupData ? (
          <Button
            onClick={backup}
            variant={'contained'}
            fullWidth
            style={{ backgroundColor: '#fff' }}
          >
            Backup Spotify Data
          </Button>
        ) : null}
        {requested && !backupData ? (
          <Paper>
            <Typography>Loading... This may take a while</Typography>
          </Paper>
        ) : null}
        {backupData && !clicked ? (
          <Button
            onClick={() => setClicked(true)}
            variant={'contained'}
            href={backupData}
            download={`${auth.username}-backup.txt`}
          >
            Download Backup
          </Button>
        ) : null}
        {clicked ? (
          <Paper style={{ padding: 16 }}>
            <Typography>
              Your file should download shortly. This is a fairly large file, so I would suggest not
              attempting to open it. Instead, hold onto it in case your data ever gets wiped or
              tampered with.
            </Typography>
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Backup);
