import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import DrawScene from "./DrawScene";

/**
 * @return {*}
 */
export default function App() {
  return (
    <BrowserRouter>
      <Route
        component={DrawScene}
        exact
        path="/draw" />
    </BrowserRouter>
  );
}
