import React, { Component } from "react";
import { connect } from "react-redux";
import map from "lodash/map";
import Font from "./Font";
import { setFont } from "../actions/fonts";
import styles from "../assets/styles/components/FontSizeCalculator.scss";

/**
 * @const {Function(Object): Object}
 */
const mapStateToProps = state => ({
  fonts: state.fonts
});

/**
 * @const {Object.<string, Function>}
 */
const mapDispatchToProps = {
  setFont
};

type Props = {
  fonts: Object,
  setFont: Function
};

export class FontSizeCalculator extends Component<void, Props> {
  /**
   * @const {Object}
   */
  props: Props;

  /**
   * @inheritDoc
   */
  shouldComponentUpdate(): bool {
    return false;
  }

  /**
   * @inheritDoc
   */
  render() {
    const fonts = map(this.props.fonts, (font, name) => {
      return (
        <Font
          family={font.family}
          key={name}
          onLoad={(props) => this.setFont(name, props)}/>
      );
    });

    return (
      <svg className={styles.fontSizeCalculator}>
        {fonts}
      </svg>
    );
  }

  /**
   * @param {string} name
   * @param {Object} font
   */
  setFont(name: string, font: Object) {
    this.props.setFont(name, {
      ...this.props.fonts[name],
      ...font
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontSizeCalculator);
