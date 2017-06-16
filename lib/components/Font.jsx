import React, { Component } from "react";

type Props = {
  onLoad: Function,
  family: string
};

export default class Font extends Component<void, Props> {
  /**
   * @const {Object}
   */
  props: Props;

  /**
   * @static
   * @const {number}
   */
  static fontSize = 500;

  /**
   * The text node
   * @type {?HTMLElement}
   * @readonly
   */
  nodeRef: ?HTMLElement;

  /**
   * Get an SVGRect of the text node
   * @return {Object}
   */
  getBBox(): { x: number, y: number, height: number, width: number } {
    return this.nodeRef.getBBox();
  }

  /**
   * @inheritDoc
   */
  componentDidMount() {
    const { height, width, x, y } = this.getBBox();
    const coef = 1 / Font.fontSize;
    const fontHeight = height + y * 2;

    this.props.onLoad({
      dx: -x * coef,
      dy: -y * coef,
      height: fontHeight * coef,
      width: width * coef
    });
  }

  /**
   * @inheritDoc
   */
  shouldComponentUpdate(): boolean {
    return false;
  }

  /**
   * @inheritDoc
   */
  render() {
    const ref = node => this.nodeRef = node;

    return (
      <text
        alignmentBaseline="hanging"
        dominantBaseline="bottom"
        fontFamily={this.props.family}
        fontSize={Font.fontSize}
        ref={ref}>
      0
      </text>
    );
  }
}
