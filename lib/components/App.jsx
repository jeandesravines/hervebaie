import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DrawScene from "./DrawScene";

/**
 * @return {*}
 */
export default function App() {
  return (
    <MuiThemeProvider>
      <BrowserRouter>
        <Route
          component={DrawScene}
          exact
          path="/draw" />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}
