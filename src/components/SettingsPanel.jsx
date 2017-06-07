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
  +fonts: Object<Object>,
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
  applySettings(e) {
    e.preventDefault();

    this.props.setSettings(this.state.settings);
  }

  /**
   * @param {string} name
   * @param {string | number | boolean} vallue
   */
  setValue(name: string, value: any) {
    console.log(name, value);
    this.setState({
      settings: {
        ...this.state.settings,
        [name]: value
      }
    });
  }

  /**
   * @inheritDoc
   */
  render() {
    const { settings } = this.state;
    const onChange = this.setValue.bind(this);
    const fonts = _.mapValues(this.props.fonts, (_font, key: string) => key);
    const toPercent = (value) => `${parseInt(value * 100)}%`;
    const toPixels = (value) => `${value}px`;

    return (
      <form onSubmit={e => this.applySettings(e)}>
        <div>
          <InputSettings
            type="slider"
            label="Max size"
            max={4096}
            onChange={value => onChange("maxSize", value)}
            toString={toPixels}
            value={settings.maxSize} />
        </div>
        <div>
          <InputSettings
            type="select"
            options={fonts}
            label="Font"
            onChange={value => onChange("fontName", value)}
            value={settings.fontName} />
        </div>
        <div>
          <InputSettings
            type="slider"
            label="Font size"
            min={1}
            max={50}
            onChange={value => onChange("fontSize", value)}
            toString={toPixels}
            value={settings.fontSize} />
        </div>
        <div>
          <InputSettings
            type="slider"
            label="Background color alpha"
            max={1}
            onChange={value => onChange("backgroundColorAlpha", value)}
            toString={toPercent}
            value={settings.backgroundColorAlpha} />
        </div>
        <div>
          <InputSettings
            type="color"
            label="Background color"
            onChange={value => onChange("backgroundColor", value)}
            value={settings.backgroundColor} />
        </div>
        <div>
          <InputSettings
            type="slider"
            label="Background image alpha"
            max={1}
            onChange={value => onChange("backgroundImageAlpha", value)}
            toString={toPercent}
            value={settings.backgroundImageAlpha} />
        </div>
        <div>
          <InputSettings
            type="checkbox"
            label="Draw as RGB"
            onChange={value => onChange("rgb", value)}
            checked={settings.rgb} />
        </div>
        <div>
          <InputSettings
            type="slider"
            label="RGB contrast"
            hide={!settings.rgb}
            min={-1}
            max={1}
            onChange={value => onChange("contrast", value)}
            toString={toPercent}
            value={settings.contrast} />
        </div>
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
