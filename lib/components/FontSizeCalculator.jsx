import React, { Component } from "react";
import { connect } from "react-redux";
import map from "lodash/map";
import Font from "./Font";
import { setFont } from "../actions/fonts";

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
      const onLoad = (props) => this.setFont(name, props);

      return (
        <Font
          family={font.family}
          key={name}
          onLoad={onLoad} />
      );
    });

    return (
      <svg>{fonts}</svg>
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
