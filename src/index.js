import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./theme";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
    >
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </SnackbarProvider>
  </ThemeProvider>,
  document.querySelector("#root")
);
