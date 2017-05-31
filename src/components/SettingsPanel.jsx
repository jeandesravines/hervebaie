import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import InputSettings from "./InputSettings";
import { setSettings } from "../actions/settings";

/**
 * @const {Function(Object): Object}
 */
const mapStateToProps = state => ({
  settings: state.settings,
  fonts: state.fonts
});

/**
 * @const {Object}
 */
const mapDispatchToProps = {
  setSettings
};

type State = {
  +settings: Object<string | number | boolean>
};

type Props = {
  +fonts: Array<Object>,
  +settings: Object<string | number | boolean>,
  +setSettings: (Object) => Object
};

export class SettingsPanel extends Component<void, Props, State> {
  /**
   * @var {Object}
   */
  state: State = {
    settings: this.props.settings
  };

  /**
   * @param {Object}
   */
  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      settings: nextProps.settings
    });
  }

  /**
   * @param {Event} e
   */
  applySettings(e: Event) {
    e.preventDefault();

    this.props.setSettings(this.state.settings);
  }

  /**
   * @param {Event} e
   */
  setValue(e: Event) {
    const { target } = e;

    this.setState({
      settings: {
        ...this.state.settings,
        [target.name]: target.value
      }
    });
  }

  /**
   * @inheritDoc
   */
  render() {
    const { settings } = this.state;
    const fonts = _.mapValues(this.props.fonts, (_font, key: string) => key);

    return (
      <form onSubmit={e => this.applySettings(e)}>
        <InputSettings
          type="number"
          step="10"
          name="maxSize"
          label="Max size"
          onChange={e => this.setValue(e)}
          value={settings.maxSize}
        />
        <InputSettings
          type="select"
          options={fonts}
          name="fontFamily"
          label="Font"
          onChange={e => this.setValue(e)}
          value={settings.fontFamily}
        />
        <InputSettings
          type="number"
          min="1"
          step="1"
          name="fontSize"
          label="Font size"
          onChange={e => this.setValue(e)}
          value={settings.fontSize}
        />
        <InputSettings
          type="number"
          min="0"
          max="1"
          step="0.05"
          name="backgroundColorAlpha"
          label="Background color alpha"
          onChange={e => this.setValue(e)}
          value={settings.backgroundColorAlpha}
        />
        <InputSettings
          type="color"
          name="backgroundColor"
          label="Background color"
          onChange={e => this.setValue(e)}
          value={settings.backgroundColor}
        />
        <InputSettings
          type="number"
          min="0"
          max="1"
          step="0.05"
          name="backgroundImageAlpha"
          label="Background image alpha"
          onChange={e => this.setValue(e)}
          value={settings.backgroundImageAlpha}
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
          hide={!settings.rgb}
          min="-1"
          max="1"
          step="0.05"
          name="rgb"
          label="RGB contrast"
          onChange={e => this.setValue(e)}
          value={settings.contrast}
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
