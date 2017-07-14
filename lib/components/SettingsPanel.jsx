import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import _ from "lodash";

import Card, { CardActions, CardContent } from "material-ui/Card"
import Button from "material-ui/Button";
import { LabelSwitch } from "material-ui/Switch";
import TextField from "material-ui/TextField";
import IconDehaze from "material-ui-icons/Dehaze";
import IconNavigateBefore from "material-ui-icons/NavigateBefore";
import Typography from "material-ui/Typography";

import SelectField from "./SelectField";
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
  settings: Object<string | number | boolean>,
  opened: boolean,
  fontsRef: ?HTMLElement
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
    opened: true,
    fontsRef: null,
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
  toggle() {
    this.setState({
      opened: !this.state.opened
    });
  }

  /**
   * @param {string} name
   * @param {string | number | boolean} vallue
   */
  setValue(e) {
    const settings = this.state.settings;
    const { checked, name, type } = e.target;
    let { value } = e.target;

    switch (type) {
    case "number":
      value = Number(value);
      break;
    case "checkbox":
      value = checked;
      break;
    }

    const nextSettings = { ...settings, [name]: value };

    this.setState({
      settings: nextSettings
    });

    if (nextSettings.liveReload) {
      this.props.setSettings(nextSettings);
    }
  }

  /**
   * @return {Element}
   */
  renderFloatingButton() {
    const { opened } = this.state;
    const toggle = this.toggle.bind(this);
    const color = opened ? "accent" : "default";
    const floatingIcon = opened ?
      <IconNavigateBefore /> :
      <IconDehaze />;

    return (
      <Button
        fab
        color={color}
        onClick={toggle}
        className={styles.floatingButton}>
        {floatingIcon}
      </Button>
    );
  }

  /**
   * @return {Element}
   */
  renderImageLoader() {
    return (
      <CardContent>
        <Typography type="headline" gutterBottom>
          Select picture
        </Typography>
        <div>
          <ImageLoader />
        </div>
      </CardContent>
    );
  }

  /**
   * @return {Element}
   */
  renderSettings() {
    const { settings } = this.state;
    const setValue = this.setValue.bind(this);
    const fonts = _.mapValues(this.props.fonts, (font, key) => key);

    return (
      <CardContent>
        <Typography type="headline" gutterBottom>
          Change settings
        </Typography>
        <div>
          <TextField
            fullWidth
            marginForm
            name="maxSize"
            type="number"
            label="Max size"
            inputProps={{min: 100, step: 100}}
            onChange={setValue}
            value={settings.maxSize} />
        </div>
        <div>
          <SelectField
            floatingTextLabel="Font"
            name="fontName"
            label={settings.fontName}
            onChange={setValue}
            value={settings.fontName}
            options={fonts} />
        </div>
        <div>
          <TextField
            fullWidth
            marginForm
            type="number"
            name="fontSize"
            label="Font size"
            inputProps={{min: 1, max: 50}}
            onChange={setValue}
            value={settings.fontSize} />
        </div>
        <div>
          <TextField
            fullWidth
            marginForm
            type="number"
            name="backgroundImageAlpha"
            label="Background image alpha"
            inputProps={{min: 0, max: 1, step: 0.05}}
            onChange={setValue}
            value={settings.backgroundImageAlpha} />
        </div>
        <div>
          <LabelSwitch
            label="Draw as RGB"
            name="rgb"
            onChange={setValue}
            checked={settings.rgb} />
        </div>
        <div style={{display: settings.rgb ? "" : "none"}}>
          <TextField
            fullWidth
            marginForm
            type="number"
            name="contrast"
            label="RGB contrast"
            inputProps={{min: -1, max: 1, step: 0.05}}
            onChange={setValue}
            value={settings.contrast} />
        </div>
      </CardContent>
    );
  }

  renderActions() {
    const { settings } = this.state;
    const setValue = this.setValue.bind(this);
    const applySettings = this.applySettings.bind(this);

    return (
      <div>
        <CardActions className={styles.cardActions}>
          <LabelSwitch
            label="Live reload"
            name="liveReload"
            onChange={setValue}
            checked={settings.liveReload} />
        </CardActions>
        <CardActions className={styles.cardActions}>
          <Button
            raised
            color="primary"
            className={styles.button}
            disabled={settings.liveReload}
            onClick={applySettings}>
            Draw
          </Button>

          <SvgExporter />
        </CardActions>
      </div>
    );
  }

  /**
   * @inheritDoc
   */
  render() {
    const { opened } = this.state;
    const className = classNames(styles.settingsPanel, {
      [styles.opened]: opened
    });

    return (
      <div className={className}>
        {this.renderFloatingButton()}

        <Card className={styles.card}>
          {this.renderImageLoader()}
          {this.renderSettings()}
          {this.renderActions()}
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPanel);
