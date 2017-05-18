import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Font from "./Font";
import { setFont } from "../actions/fonts";

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

    const style = {
      position: "absolute",
      top: "-1px",
      left: "-1px",
      width: 0,
      height: 0
    };

    return (
      <svg style={style}>{fonts}</svg> 
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
)(FontSizeCalculator)
