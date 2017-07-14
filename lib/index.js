import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";

import reducers from "./reducers";
import App from "./components/App";

export const store = createStore(reducers, applyMiddleware(reduxPromise));
export const component = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  component,
  document.getElementById("root")
);
