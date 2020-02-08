import { createMuiTheme } from '@material-ui/core';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';

const theme = responsiveFontSizes(
  createMuiTheme({
    zIndex: {
      appBar:1400
    },
    palette: {
      primary: {
        lightest: '#dff7ff',
        light: '#ace9fe',
        lightish: '#70dbfe',
        main: '#00ccff',
        darkeh: '#00c0ff',
        darkish: '#00b4ff',
        darker: '#00a6f4',
        darkerer: '#0093e1',
        darkererer: '#0081cd',
        dark: '#0061ac',
      },
      secondary: {
        dark: '#fc8410',
        main: '#0e103a',
        lighteh: '#ffc62a',
        lighter: '#ffde33',
        light: '#f8e82d',
        lighterer: '#fbed51',
        lightfug: '#fdf273',
        lightest: '#fef69c',
        lightester: '#fffac4',
        basicallyWhite: '#fffee7',
      },
      background: {
        main: '#0f1033',
        light: '#4a4a4a',
        dark: '#270067',
        white: '#ffffff',
        medium: '#474747',
        darkish: '#333333',
        drawer: '#1e0063',
      },
      accent: {
        light: '#00f2ea',
        main: '#00d9df',
        dark: '#007768',
      },
    },
    typography: {
      fontFamily: [
        'Arial',
        'sans-serif',
        '"Helvetica Neue"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',

        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h6: {},
      username: {
        font: 'Roboto',
        fontWeight: 800,
      },
    },
  }),
);

export default theme;
