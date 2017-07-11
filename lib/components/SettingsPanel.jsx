import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import _ from "lodash";

import { Card, CardActions, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Subheader from "material-ui/Subheader";
import FloatingActionButton from "material-ui/FloatingActionButton";
import IconDehaze from "material-ui/svg-icons/image/dehaze";
import IconLeft from "material-ui/svg-icons/image/navigate-before";

import CheckboxField from "./CheckboxField";
import SelectField from "./SelectField";
import TextField from "./TextField";
import SvgExporter from "./SvgExporter";
import ImageLoader from "./ImageLoader";

import { setSettings } from "../actions/settings";
import styles from "../assets/styles/components/SettingsPanel.scss";

/**
 * @const {Function(Object): Object}
 */
const mapStateToProps = state => ({
  settings: state.settings,
  fonts: state.fonts,
  image: state.image
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
  fonts: Object<Object>,
  image: ?HTMLImageElement,
  settings: Object<string | number | boolean>,
  setSettings: (Object) => Object
};

export class SettingsPanel extends Component<void, Props, State> {
  /**
   * @const {Object}
   */
  props: Props;

  /**
   * @const {Object}
   */
  state: State = {
    settings: this.props.settings,
    opened: true
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
   *
   */
  applySettings() {
    this.props.setSettings(this.state.settings);
  }

  /**
   *
   */
  toggleOpen() {
    this.setState({
      opened: !this.state.opened
    });
  }

  /**
   * @param {string} name
   * @param {string | number | boolean} vallue
   */
  setValue(name: string, value: any) {
    const settings = this.state.settings;
    const nextSettings = { ...settings, [name]: value };

    this.setState({
      settings: nextSettings
    });

    if (nextSettings.liveReload) {
      this.props.setSettings(nextSettings);
    }
  }

  /**
   * @inheritDoc
   */
  render() {
    const { settings } = this.state;
    const onChange = (name, value) => this.setValue(name, value);
    const fonts = _.mapValues(this.props.fonts, (font, key) => key);
    const toPercent = (value) => `${parseInt(value * 100)}%`;
    const toPixels = (value) => `${value}px`;

    const classes = classNames(styles.settingsPanel, {
      [styles.opened]: this.state.opened
    });

    const floatingIcon = this.state.opened ?
      <IconLeft /> :
      <IconDehaze />;

    return (
      <div className={classes}>
        <FloatingActionButton
          mini={!this.state.opened}
          onTouchTap={() => this.toggleOpen()}
          className={styles.floatingButton}>
          {floatingIcon}
        </FloatingActionButton>

        <Card className={styles.card}>
          <CardText className={styles.cardText}>
            <Subheader>Select picture</Subheader>
            <div>
              <ImageLoader />
            </div>
          </CardText>
          <CardText className={styles.cardText}>
            <Subheader>Change settings</Subheader>
            <div>
              <TextField
                type="number"
                label="Max size"
                min={100}
                step={100}
                onChange={value => onChange("maxSize", value)}
                value={settings.maxSize} />
            </div>
            <div>
              <SelectField
                options={fonts}
                label="Font"
                onChange={value => onChange("fontName", value)}
                value={settings.fontName} />
            </div>
            <div>
              <TextField
                type="number"
                label="Font size"
                min={1}
                max={50}
                step={1}
                onChange={value => onChange("fontSize", value)}
                toString={toPixels}
                value={settings.fontSize} />
            </div>
            <div>
              <TextField
                type="number"
                label="Background image alpha"
                min={0}
                max={1}
                step={0.05}
                onChange={value => onChange("backgroundImageAlpha", value)}
                toString={toPercent}
                value={settings.backgroundImageAlpha} />
            </div>
            <div>
              <CheckboxField
                label="Draw as RGB"
                onChange={value => onChange("rgb", value)}
                checked={settings.rgb} />
            </div>
            <div style={{display: settings.rgb ? "" : "none"}}>
              <TextField
                type="number"
                label="RGB contrast"
                min={-1}
                max={1}
                step={0.05}
                onChange={value => onChange("contrast", value)}
                toString={toPercent}
                value={settings.contrast} />
            </div>
          </CardText>
          <CardActions className={styles.cardActions}>
            <div>
              <CheckboxField
                label="Live reload"
                onChange={value => onChange("liveReload", value)}
                checked={settings.liveReload} />
            </div>
            <div>
              <RaisedButton
                primary={true}
                className={styles.button}
                disabled={this.state.settings.liveReload}
                label="Draw"
                onTouchTap={() => this.applySettings()} />

              <SvgExporter />
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPanel);
