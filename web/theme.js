import {createTheme, responsiveFontSizes} from '@mui/material/styles';

export const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#1975bc',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#c9c9c9',
      contrastText: '#ffffff'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {

      }
    }
  }
}));

export const fullScreen = {
  width: '100%',
  height: '100%',
  textAlign: 'center'
};

export const row = {
  display: 'flex',
  flexDirection: 'row'
};

export const column = {
  display: 'flex',
  flexDirection: 'column'
};

export const stretch = {
  flexGrow: '1',
  flexShrink: '1'
};

export const stiff = {
  flexGrow: '0',
  flexShrink: '0'
};

export const center = {
  alignItems: 'center'
};

export const buffer = {
  paddingTop: '4px',
  paddingBottom: '4px'
};

export const bigTopBuffer = {
  paddingTop: '20px'
};

export const pagePadding = {
  padding: '24px'
};