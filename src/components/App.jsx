import React, { Component } from 'react';
import AppRouter from './AppRouter';
import SettingsPanel from './SettingsPanel';
import Canvas from './Canvas';

import '../assets/styles/app.scss';

/**
 * @class
 * @extends Components
 */
export default class App extends Component {
  /**
   * @inheritDoc
   */
  render() {
    return (
      <div className="app">
        <AppRouter />
      </div>
    );
  }
}
