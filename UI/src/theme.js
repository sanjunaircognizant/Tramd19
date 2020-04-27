import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app

export const colors ={
  primary: {
    main: '#e84118',
  },
  secondary: {
    main: '#2c3e50',
  },
  error: {
    main: red.A400,
  },
  background: {
    default: '#fff',
  },
  green:{
    main:"#00f000",
  }
}
const theme = createMuiTheme({palette: colors,});

export default theme;
