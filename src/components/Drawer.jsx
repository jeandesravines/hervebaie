import React from 'react';
import SettingsPanel from './SettingsPanel';
import Canvas from './Canvas';
import FontsContainer from './FontsContainer';

export default () => (
  <div>
    <FontsContainer />
    <SettingsPanel />
    <Canvas />
  </div>
);
