import React, { PureComponent } from "react";

type Props = {
  x: number,
  y: number,
  data: Array<number>,
  font: {
    width: number,
    height: number,
    dx: number,
    dy: number
  }
};

export default class Pixel extends PureComponent<void, Props> {
  /**
   * @const {Object}
   */
  props: Props;

  /**
   * @param {Array} data
   * @return {string}
   */
  static getColorFromData(data: Array<number>): string {
    const colorComponents = data.slice(0, 3);
    const alpha = data[3];

    if (alpha === 255) {
      return Pixel.rgbToHexadecimal(colorComponents);
    }

    const opacity = Pixel.round(alpha / 255);
    const rgba = colorComponents.concat([opacity])
      .toString();

    return `rgba(${rgba})`;
  }

  /**
   * @param {number} component
   * @return {string}
   */
  static getTextFromComponent(component: number): string {
    const value = component.toString();

    return "0".repeat(3)
      .substr(0, 3 - value.length)
      .concat(value);
  }

  /**
   * @param {number} number
   * @return {number}
   */
  static round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  /**
   * @param {Array} components
   * @return {string}
   */
  static rgbToHexadecimal(components: Array<number>): string {
    return components.reduce((hex, n) => {
      return hex + (n < 16 ? "0" : "") + n.toString(16);
    }, "#");
  }

  /**
   * @return {*}
   */
  render() {
    const {x, y, font: {width, height, dx, dy}} = this.props;
    const lineHeight = height + dy;
    const lineWidth = width + dx;
    const lineX = x * lineWidth * 3 + dx;
    const lineY = y * lineHeight * 3 + dy;
    const pixelData = this.getPixelData();
    const lines = new Array(3);

    for (let i = 3; i--;) {
      const {color, text} = pixelData[i];
      const textProps = {
        key: i,
        x: Pixel.round(lineX),
        y: Pixel.round(lineY + i * lineHeight),
        alignmentBaseline: "hanging",
        fill: color
      };

      lines[i] = <text {...textProps}>{text}</text>;
    }

    return (
      <g key={`${x}-${y}`}>
        {lines}
      </g>
    );
  }

  /**
   * @return {Array}
   */
  getPixelData(): Array<{ text: string, color: string }> {
    const {data} = this.props;
    const pixelData = new Array(3);
    const color = Pixel.getColorFromData(data);

    for (let i = 3; i--;) {
      pixelData[i] = {
        color,
        text: Pixel.getTextFromComponent(data[i])
      };
    }

    return pixelData;
  }
}
