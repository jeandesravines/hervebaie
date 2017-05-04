import React from "react";
import { Route } from "react-router-dom";
import Drawer from "./Drawer";

export default () => (
  <div>
    <Route exact path="/draw" component={Drawer} />
  </div>
);
