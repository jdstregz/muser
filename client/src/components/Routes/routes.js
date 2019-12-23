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

const Routes = () => {
  return {
    dashboard: {
      text: 'Dashboard',
      link: '/dashboard',
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
          icon: <Queue />,
          description: 'Group listening feature',
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
  };
};
export default Routes;
