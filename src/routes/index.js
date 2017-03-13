import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../components/app';
import LoginSignin from '../components/login-signin';

export default () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/login/signin" component={LoginSignin} />
    </div>
  </BrowserRouter>
);
