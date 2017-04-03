import React, { Component } from 'react';
import AppRouter from './AppRouter';
import SettingsPanel from './SettingsPanel';
import Canvas from './Canvas';

import _style from  '../assets/styles/app.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <AppRouter />
      </div>
    );
  }
}
