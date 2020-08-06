import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { fetchSession, fetchSpotifySession } from './actions/authActions';
import PropTypes from 'prop-types';
import theme from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import Dash from './components/Dashboard/Dash';
import { initializeSocket, initializeSocketListeners } from './services/socket';
import { SnackbarProvider } from 'notistack';
import { Helmet } from 'react-helmet';
import config from './config/config';
import useInterval from './components/Utilities/useInterval';

const App = (props) => {
  const [tokenCheckInterval, setTokenCheckInterval] = React.useState(null);
  const {
    fetchSession,
    fetchSpotifySession,
    spotify,
    initializeSocket,
    initializeSocketListeners,
    socket,
  } = props;

  useInterval(() => {
    const { token, updatedAt } = spotify.spotifySessionActive;
    console.log(`Current token: ${token}`);
    let timeLeft = Math.floor((3600000 - (Date.now() - updatedAt)) / 60000);
    console.log(`${timeLeft} minutes left`);
  }, tokenCheckInterval);

  useEffect(() => {
    console.log('initializing socket listeners');
    //initializeSocketListeners();
    initializeSocket().then(() => {
      console.log('Socket Initialized');
    });
  }, [initializeSocket]);

  useEffect(() => {
    if (socket) {
      initializeSocketListeners(socket);
    }
  }, [socket, initializeSocketListeners]);

  useEffect(() => {
    fetchSession();
    fetchSpotifySession();
  }, [fetchSession, fetchSpotifySession]);

  useEffect(() => {
    if (spotify && spotify.spotifySessionActive) {
      const { token } = spotify.spotifySessionActive;
      if (token) {
        setTokenCheckInterval(900000);
      } else {
        setTokenCheckInterval(null);
      }
    } else {
      setTokenCheckInterval(null);
    }
  }, [spotify]);

  return (
    <div>
      <Helmet>
        <style>{`body { background-color: ${theme.palette.background.main}; }`}</style>
      </Helmet>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path={'/login'} component={LoginPage} />
              <Route
                exact
                path={'/spotify-login'}
                component={() => {
                  window.location.href = `${config.api.url}/auth/spotify/login`;
                  return null;
                }}
              />
              ;
              <Route path={'/'} component={Dash} />
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    spotify: state.spotify,
    socket: state.socket,
  };
}

App.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.shape({})]).isRequired,
  fetchSession: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  fetchSession,
  fetchSpotifySession,
  initializeSocket,
  initializeSocketListeners,
})(App);
