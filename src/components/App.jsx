import React from 'react';
import AppRouter from './AppRouter';
import SettingsPanel from './SettingsPanel';
import Canvas from './Canvas';

import _style from  '../assets/styles/app.scss';

export default () => (
  <div className="app">
    <AppRouter />
  </div>
);
