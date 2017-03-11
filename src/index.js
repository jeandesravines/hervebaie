import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';

import routes from './routes';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(reduxPromise));
const component = (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>
);

ReactDOM.render(component, document.querySelector('.container'));
