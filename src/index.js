import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import configuration from './configuration/configuration';
import reducer from './reducers';
import App from './components/App';
import './assets/styles/index.scss';

const store = createStore(reducer, applyMiddleware(reduxPromise));
const component = (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>
);

firebase.initializeApp(configuration.firebase);
ReactDOM.render(
  component, 
  document.getElementById('root')
);
