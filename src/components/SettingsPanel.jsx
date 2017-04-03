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
  state = {
    
  };
  
  componentDidReceiveProps(props) {
    this.setState(props);
  }
  
  render() {
    const fontOptions = _.map(this.props.fonts, (font: Object, key: string) => (
      <option key={key} value={key}>{key}</option>
    ));
    
    return (
      <form onSubmit={e => this.setSettings()}>
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
          <label>Background color alpha:</label>
          <input name="backgroundColorAlpha"
            type="number"
            min="0" max="1" step="0.05"
            onChange={e => this.setValue(e)}
            value={this.props.settings.backgroundColorAlpha} />
        </div>
        <div>
          <label>Background color:</label>
          <input name="backgroundColor"
            type="color"
            onChange={e => this.setValue(e)}
            value={this.props.settings.backgroundColor} />
        </div>
        <div>
          <label>Background alpha:</label>
          <input name="backgroundAlpha"
            type="number"
            min="0" max="1" step="0.05"
            onChange={e => this.setValue(e)}
            value={this.props.settings.backgroundAlpha} />
        </div>
        <div>
          <label>Components colors:</label>
          <input name="components"
            type="checkbox"
            onChange={e => this.setValue(e)}
            checked={this.props.settings.components} />
        </div>
        <div style={this.getConditionalStyle('components')}>
          <label>Components colors' contrast:</label>
          <input name="componentsContrast"
            type="number"
            min="-1" max="1" step="0.05"
            onChange={e => this.setValue(e)}
            value={this.props.settings.componentsContrast} />
        </div>
        <div>
          <button type="submit">Valider</button>
        </div>
      </form>
    );
  }
  
  getConditionalStyle(name: string): Object {
    return this.props.settings[name] ? {} : {display: 'none'};
  }
    
  setValue(e: Event) {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;
    
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  }
}
