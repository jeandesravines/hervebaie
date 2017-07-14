import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DrawScene from "./DrawScene";

injectTapEventPlugin();

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
