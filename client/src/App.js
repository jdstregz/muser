import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { fetchSession, fetchSpotifySession } from './actions/authActions';
import PropTypes from 'prop-types';
import theme from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import Dash from './components/Dashboard/Dash';
import { SnackbarProvider } from 'notistack';
import { Helmet } from 'react-helmet';
import config from './config/config';

const App = props => {
  const { fetchSession, fetchSpotifySession } = props;

  useEffect(() => {
    fetchSession();
    fetchSpotifySession();
  }, [fetchSpotifySession, fetchSession]);

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
  };
}

App.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.shape({})]).isRequired,
  fetchSession: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchSession, fetchSpotifySession })(App);