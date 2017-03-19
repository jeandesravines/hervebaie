import React from 'react';
import { Route } from 'react-router-dom';

import AuthenticationSignIn from './AuthenticationSignIn';
import Drawer from './Drawer';

export default () => (
  <div>
     <Route exact path="/auth/signin" component={AuthenticationSignIn} />
     <Route exact path="/draw" component={Drawer} />
  </div>
);
