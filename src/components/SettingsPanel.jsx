import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import InputSettings from "./InputSettings";
import { setSettings } from "../actions/settings";

const mapStateToProps = state => ({
  settings: state.settings,
  fonts: state.fonts
});

const mapDispatchToProps = {
  setSettings
};

export class SettingsPanel extends Component {
  state: {
    settings: Object
  } = {};

  props: {
    fonts: Array<Object>,
    settings: Object,
    setSettings: Function
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      settings: nextProps.settings
    });
  }

  applySettings(e) {
    e.preventDefault();
    this.props.setSettings(this.state.settings);
  }

  setValue(e) {
    const { target } = e;

    this.setState({
      settings: {
        ...this.state.settings,
        [target.name]: target.value
      }
    });
  }

  render() {
    const { settings } = this.state;

    if (!settings) {
      return null;
    }

    const fonts = _.mapValues(this.props.fonts, (_font, key: string) => key);

    return (
      <form onSubmit={e => this.applySettings(e)}>
        <InputSettings
          type="number"
          step="10"
          name="maxSize"
          label="Max size"
          onChange={e => this.setValue(e)}
          value={this.state.settings.maxSize}
        />
        <InputSettings
          type="select"
          options={fonts}
          name="fontFamily"
          label="Font"
          onChange={e => this.setValue(e)}
          value={this.state.settings.fontFamily}
        />
        <InputSettings
          type="number"
          min="1"
          step="1"
          name="fontSize"
          label="Font size"
          onChange={e => this.setValue(e)}
          value={this.state.settings.fontSize}
        />
        <InputSettings
          type="number"
          min="0"
          max="1"
          step="0.05"
          name="backgroundColorAlpha"
          label="Background color alpha"
          onChange={e => this.setValue(e)}
          value={this.state.settings.backgroundColorAlpha}
        />
        <InputSettings
          type="color"
          name="backgroundColor"
          label="Background color"
          onChange={e => this.setValue(e)}
          value={this.state.settings.backgroundColor}
        />
        <InputSettings
          type="number"
          min="0"
          max="1"
          step="0.05"
          name="backgroundAlpha"
          label="Background alpha"
          onChange={e => this.setValue(e)}
          value={this.state.settings.backgroundAlpha}
        />
        <InputSettings
          type="checkbox"
          name="rgb"
          label="Draw as RGB"
          onChange={e => this.setValue(e)}
          value={this.state.settings.rvb}
        />
        <InputSettings
          type="number"
          hide={!this.state.settings.rgb}
          min="-1"
          max="1"
          step="0.05"
          name="rgb"
          label="RGB contrast"
          onChange={e => this.setValue(e)}
          value={this.state.settings.contrast}
        />

        <div>
          <button type="submit">Draw</button>
        </div>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPanel);
