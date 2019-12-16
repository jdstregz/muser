import React from 'react';
import {
  Dashboard,
  Alarm,
  Settings,
  Group,
  BeachAccess,
  LibraryMusic,
  QueueMusic,
} from '@material-ui/icons';

import SettingsPage from '../Settings/Settings';

const Routes = () => {
  return {
    dashboard: {
      text: 'Dashboard',
      link: '/dashboard',
      icon: <Dashboard />,
      description: 'Dashboard for quick profile view and feeds',
    },
    mainRoute: {
      text: 'Muse Tools',
      link: '/muse-tools',
      icon: <LibraryMusic />,
      description: 'Muse Tools',
      index: 1,
      subroutes: {
        sub1: {
          text: 'Playlist Tools',
          link: '/playlist-tools',
          icon: <QueueMusic />,
          description: 'This is subroute 1',
        },
        sub2: {
          text: 'Other',
          link: '/sub-2',
          icon: <BeachAccess />,
          description: 'This is subroute 2',
        },
      },
    },
    analytics: {
      text: 'Friends',
      link: '/friends',
      icon: <Group />,
      description: 'An example analytics route',
    },
    idk: {
      text: 'I dunno',
      link: '/i-d-k',
      icon: <Alarm />,
      description: 'Something',
    },
    settings: {
      text: 'Settings',
      link: '/settings',
      icon: <Settings />,
      render: () => <SettingsPage />,
      description: 'Profile settings',
    },
  };
};
export default Routes;
