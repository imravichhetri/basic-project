import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    pallet: 'light',
    primary: {
      main: '#f8f8f8'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000'
    }
  }
  /* primary: {
    light: '#757ce8',
    main: '#002884'
     dark: '#f8f8f8',
    contrastText: '#fff'
  }
 secondary: {
    light: '#ff7961',
    main: '#f44336',
    dark: '#ba000d',
    contrastText: '#000'
  } */
})
