import { red, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: teal[400],
      dark: teal[800],
      light: teal[200],
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: teal[100],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: teal[800],
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          border: `1px solid ${teal[400]}`,
        },
      },
    },
  },
});

export default theme;
