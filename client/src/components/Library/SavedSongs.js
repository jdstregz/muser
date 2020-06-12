import React, { useEffect } from 'react';
import { Grid, Typography, ListItem, ListItemText, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { FixedSizeList as List } from 'react-window';
import useStyles from './styles/styles';
import { getAllUserSongs, setCurrentSongList } from '../../actions/musicActions';
import SongCard from './Cards/SongCard';

const SavedSongs = (props) => {
  const { setCurrentSongList } = props;
  const classes = useStyles();
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    // get all songs
    getAllUserSongs().then((data) => {
      setSongs(data);
    });
  }, []);

  const playSong = (song) => {
    setCurrentSongList([song.track.uri]);
  };

  const SongRow = ({ index, style }) => (
    <ListItem button style={style} onClick={() => playSong(songs[index])}>
      <SongCard songObject={songs[index]} />
    </ListItem>
  );

  return (
    <Grid container justify={'center'} alignItems={'flex-start'}>
      <Grid item xs={12}>
        <Typography className={classes.text} variant={'h5'}>
          Saved Songs
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List height={500} itemCount={songs.length} itemSize={35} width={'100%'}>
          {SongRow}
        </List>
      </Grid>
    </Grid>
  );
};

export default connect(null, { setCurrentSongList })(SavedSongs);
