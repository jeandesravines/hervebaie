import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import Font from "./Font";
import { setFont } from "../actions/fonts";
import "../assets/styles/FontSizeCalculator.scss";

const mapStateToProps = state => ({
  fonts: state.fonts
});

const mapDispatchToProps = {
  setFont
};

export class FontSizeCalculator extends Component {
  props: {
    fonts: Object,
    setFont: Function
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const fonts = _.map(this.props.fonts, (font, name) => (
      <Font
        key={name}
        family={font.family}
        onLoad={props => this.setFont(name, props)} />
    ));

    return (
      <svg className="hb-font-size-calculator">{fonts}</svg> 
    );
  }
  
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
