import React, { Component } from "react";

export default class Font extends Component {
  /**
   * @static
   * @const {number}
   */
  static fontSize = 500;
  
  /**
   * @const {Object}
   */
  props: {
    onLoad: Function,
    family: string
  };
  
  /**
   * The text node
   * @readonly
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
   * @return {{
   *   x: number,
   *   y: number,
   *   height: number,
   *   width: number
   * }}
   */
  getBBox(): {x: number, y: number, height: number, width: number} {
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
    const { family } = this.props;

    return (
      <svg>
        <text
          ref={n => this.textNode = n}
          fontFamily={family}
          alignmentBaseline="hanging"
          dominantBaseline="bottom"
          fontSize={Font.fontSize}>
          0
        </text>
      </svg>
    );
  }
}
