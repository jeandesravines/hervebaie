import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageLoader from './ImageLoader';
import * as actions from '../actions/settings';

const mapStateToProps = (state) => ({
  settings: state.settings,
  fonts: state.fonts,
});

@connect(mapStateToProps, actions)
export default class SettingsPanel extends Component {
  render() {
    const fontOptions = _.map(this.props.fonts, (font, key) => (
      <option key={key} value={key}>{key}</option>
    ));
    
    return (
      <div>
        <div>
          <ImageLoader />
        </div>
        <div>
          <label>Max Size:</label>
          <input name="maxSize"
            type="number"
            step="1"
            onChange={e => this.setValue(e)}
            value={this.props.settings.maxSize} />
        </div>
        <div>
          <label>Font:</label>
          <select name="fontFamily"
            onChange={e => this.setValue(e)}
            value={this.props.settings.fontFamily}>
            {fontOptions}
          </select>
        </div>
        <div>
          <label>Font Size:</label>
          <input name="fontSize"
            type="number"
            step="1"
            onChange={e => this.setValue(e)}
            value={this.props.settings.fontSize} />
        </div>
        <div>
          <label>Background color:</label>
          <input name="backgroundColor"
            type="color"
            onChange={e => this.setValue(e)}
            value={this.props.settings.backgroundColor} />
        </div>
        <div>
          <label>Background color alpha:</label>
          <input name="backgroundColorAlpha"
            type="number"
            min="0" max="1" step="0.05"
            onChange={e => this.setValue(e)}
            value={this.props.settings.backgroundColorAlpha} />
        </div>
        <div>
          <label>Background alpha:</label>
          <input name="backgroundAlpha"
            type="number"
            min="0" max="1" step="0.05"
            onChange={e => this.setValue(e)}
            value={this.props.settings.backgroundAlpha} />
        </div>
      </div>
    );
  }
    
  setValue(e) {
    const {
      name,
      value,
      checked
    } = e.target;
    
    this.props.setValue(name, checked || value);
  }
}
