import React from 'react';
import SettingsPanel from './SettingsPanel';
import PixelList from './PixelList';
import FontsContainer from './FontsContainer';

export default () => (
  <div>
    <FontsContainer />
    <SettingsPanel />
    <PixelList />
  </div>
);
