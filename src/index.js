import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

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

ReactDOM.render(
  component, 
  document.getElementById('root')
);
