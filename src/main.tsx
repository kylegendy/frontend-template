
import { h, render } from "preact"
import Router, { Route } from "preact-router";

import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from '@mui/material/colors';

// import PouchDB from 'pouchdb';
// const db: PouchDB.Database<{}> = new PouchDB('blob');

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "Open Sans", "Vidaloka", "sans-serif"].join(','),
  },
  palette: {
    primary: { main: "#9C9989", dark: "#726E58" },
    secondary: { main: "#A3D6F4" },
    success: { main: "#6B8F71" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});

function AccountPages() {
    return (
      <ThemeProvider theme={theme}>
        <Button>click me</Button>
      </ThemeProvider>
    );
};

render(<AccountPages />, document.body);