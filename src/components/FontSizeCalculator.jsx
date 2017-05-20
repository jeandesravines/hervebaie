import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Font from "./Font";
import { setFont } from "../actions/fonts";
import styles from "../styles/FontSizeCalculator";

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

export class FontSizeCalculator extends Component {
  /**
   * @const {Object}
   */
  props: {
    fonts: Object,
    setFont: Function
  };

  /**
   * @inheritDoc
   */
  shouldComponentUpdate(): bool {
    return false;
  }

  /**
   * @inheritDoc
   */
  render(): any {
    const fonts = _.map(this.props.fonts, (font, name) => (
      <Font
        key={name}
        family={font.family}
        onLoad={props => this.setFont(name, props)} />
    ));

    return (
      <svg style={styles.root}>{fonts}</svg> 
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
