import React from 'react';
import {
  Dashboard,
  AccountCircleOutlined,
  Settings,
  Group,
  BeachAccess,
  LibraryMusic,
  Search,
  Home,
  Queue,
  QueueMusic,
} from '@material-ui/icons';

import SettingsPage from '../Settings/Settings';
import Profile from '../Profile/Profile';
import Friends from '../Friends/Friends';
import About from '../About/About';
import Library from '../Library/Library';
import SearchPage from '../Search/Search';
import DashboardPage from '../Dashboard/DashboardPage';
import GroupListeningLanding from '../GroupListening/GroupListeningLanding';
import Albums from '../Library/Albums';
import Playlists from '../Library/Playlists';
import SavedSongs from '../Library/SavedSongs';
import GroupListeningRoom from '../GroupListening/GroupListeningRoom';
import MuseToolsLanding from '../Library/MuseToolsLanding';

const Routes = () => {
  return {
    dashboard: {
      text: 'Dashboard',
      link: '/',
      icon: <Dashboard />,
      render: () => <DashboardPage />,
      description: 'Dashboard for quick profile view and feeds',
    },
    mainRoute: {
      text: 'Muse Tools',
      link: '/muse-tools',
      icon: <LibraryMusic />,
      description: 'Muse Tools',
      index: 1,
      render: () => <MuseToolsLanding />,
      subroutes: {
        library: {
          text: 'Library',
          link: '/library',
          icon: <Home />,
          render: () => <Library />,
          description: 'Current users library',
        },
        search: {
          text: 'Search',
          link: '/search',
          icon: <Search />,
          render: () => <SearchPage />,
          description: 'Search for music',
        },
        playlistTools: {
          text: 'Playlist Tools',
          link: '/playlist-tools',
          icon: <QueueMusic />,
          description: 'This is subroute 1',
        },
        groupListening: {
          text: 'Group Listening',
          link: '/group-listening',
          render: () => <GroupListeningLanding />,
          icon: <Queue />,
          description: 'Group listening feature',
        },
        GroupListeningRoom: {
          exact: false,
          hide: true,
          link: '/gl-room',
          render: () => <GroupListeningRoom />,
          description: 'A room for a group listening party',
        },
      },
    },
    analytics: {
      text: 'Friends',
      link: '/friends',
      icon: <Group />,
      render: () => <Friends />,
      description: 'An example analytics route',
    },
    profile: {
      text: 'Profile',
      link: '/profile',
      icon: <AccountCircleOutlined />,
      render: () => <Profile />,
      description: 'Profile',
    },
    settings: {
      text: 'Settings',
      link: '/settings',
      icon: <Settings />,
      render: () => <SettingsPage />,
      description: 'Profile settings',
    },
    about: {
      text: 'About',
      link: '/about',
      icon: <BeachAccess />,
      render: () => <About />,
      description: 'About page',
    },
    /////////////// HIDDEN ROUTES (NON-SIDEBAR-ROUTES)
    Albums: {
      text: 'Albums',
      link: '/albums',
      render: () => <Albums />,
      hide: true,
      description: 'Showing all user saved Albums',
    },
    Playlists: {
      text: 'Playlists',
      link: '/playlists',
      render: () => <Playlists />,
      hide: true,
      description: 'Showing all user playlists',
    },
    SavedSongs: {
      text: 'Saved Songs',
      link: '/saved-songs',
      render: () => <SavedSongs />,
      hide: true,
      description: 'Showing all user saved songs',
    },
  };
};
export default Routes;
