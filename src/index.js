import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { initializeApp } from 'firebase';

import configuration from './configuration/configuration';
import Router from './routes';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(reduxPromise));
const component = (
  <Provider store={store}>
    <Router />
  </Provider>
);

initializeApp(configuration.firebase);

ReactDOM.render(component, document.querySelector('.container'));
