import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import DrawScene from "./DrawScene";

/**
 * @return {*}
 */
export default function App(): any {
  return (
    <BrowserRouter>
      <Route exact path="/draw" component={DrawScene} />
    </BrowserRouter>
  );
}
