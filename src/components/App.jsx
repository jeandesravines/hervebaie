import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import DrawScene from "./DrawScene";
import "../assets/styles/app.scss";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route exact path="/draw" component={DrawScene} />
      </BrowserRouter>
    </div>
  );
}
