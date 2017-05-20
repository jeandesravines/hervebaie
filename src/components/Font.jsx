import React, { Component } from "react";

type Props = {
  onLoad: Function,
  family: string
};

export default class Font extends Component<void, Props> {
  /**
   * @static
   * @const {number}
   */
  static fontSize = 500;
  
  /**
   * The text node
   * @type {?HTMLElement}
   */
  textNode: ?HTMLElement;

  /**
   * @inheritDoc
   */
  shouldComponentUpdate(): boolean {
    return false;
  }
  
  /**
   * Get an SVGRect of the text node
   * @return {Object}
   */
  getBBox(): { x: number, y: number, height: number, width: number } {
    return this.textNode.getBBox();
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    const { height, width, x, y } = this.getBBox();
    const coef = 1 / Font.fontSize;
    const fontHeight = height + y * 2;
    const fontWidth = width;

    this.props.onLoad({
      dx: -x * coef,
      dy: -y * coef,
      height: fontHeight * coef,
      width: fontWidth * coef
    });
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      <text
        ref={n => this.textNode = n}
        fontFamily={this.props.family}
        alignmentBaseline="hanging"
        dominantBaseline="bottom"
        fontSize={Font.fontSize}>
        0
      </text>
    );
  }
}
