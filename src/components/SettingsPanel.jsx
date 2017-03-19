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
      <option key={key} value={key}>{font.fontFamily}</option>
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
          <label>Font Family:</label>
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
      </div>
    );
  }
    
  setValue(e) {
    const {
      name,
      value,
      checked
    } = e.target;
    
    console.log({e, name, checked, value});
    
    this.props.setValue(name, checked || value);
  }

  setFont(e) {

  }
}
