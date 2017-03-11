import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import LoginSignin from '../components/login-signin';

export default (
  <Route path="/" component={App}>
    //<IndexRoute component={Login}/>
    <Route path="login/signin" component={LoginSignin}/>
  </Route>
);
