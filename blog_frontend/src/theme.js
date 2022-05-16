import { red, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: teal[400],
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
    MuiFab: {
      styleOverrides: {
        root: {
          position: "fixed",
          bottom: 20,
          right: 20,
        },
      },
    },
  },
});

export default theme;
