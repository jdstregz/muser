import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SecuredRoute from '../Auth/SecuredRoute';
import useStyles from './styles/Dash.styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon, Cancel } from '@material-ui/icons';
import { destroySession } from '../../actions/authActions';
import logo from '../../assets/MuserIcon.png';
import DashDrawer from './DashDrawer';
import DashRoutes from './DashRoutes';
import SpotifyPlayer from '../Player/SpotifyPlayer';
import { Link } from 'react-router-dom';
import config from '../../config/config';
import { getIncomingFriendRequests, getOutgoingFriendRequests } from '../../actions/userActions';

const Dash = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { destroySession, history, spotify, socket } = props;
  const isMenuOpen = Boolean(anchorEl);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const classes = useStyles();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    destroySession(history);
  };

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to={'/settings'} onClick={handleMenuClose}>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  if (spotify === false || (spotify && spotify.spotifySessionActive === false)) {
    if (config && config.api && config.api.url) {
      history.push('/spotify-login');
      return null;
    }
  }

  if (!socket) {
    return <div>Loading</div>;
  }

  return (
    <div className={classes.root}>
      <AppBar position={'fixed'} className={classes.appBarClass} color={'secondary'}>
        <Toolbar>
          {mobile ? (
            <IconButton
              color={'inherit'}
              className={classes.menuButton}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              {drawerOpen ? <Cancel /> : <MenuIcon />}
            </IconButton>
          ) : null}
          <img alt={'logo'} src={logo} className={classes.logo} />
          <Typography className={classes.title}>Muser</Typography>
          <IconButton style={{ color: '#fff' }} onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {profileMenu}
      <DashDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <DashRoutes />
      </main>
      <div className={classes.player}>
        <SpotifyPlayer />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    spotify: state.spotify,
    requests: state.requests,
    socket: state.socket,
  };
}

export default connect(mapStateToProps, {
  destroySession,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
})(withRouter(SecuredRoute(Dash)));
