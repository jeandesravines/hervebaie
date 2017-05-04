import React, { PureComponent } from "react";

export default class Pixel extends PureComponent {
  props: {
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

  render() {
    const { x, y, font: { width, height, dx, dy } } = this.props;

    const lineHeight = height + dy;
    const lineWidth = width + dx;
    const lineX = x * lineWidth * 3 + dx;
    const lineY = y * lineHeight * 3 + dy;
    const pixelData = this.getPixelData();
    const lines = new Array(3);

    for (let i = 3; i--; ) {
      const { color, text } = pixelData[i];
      const textProps = {
        key: i,
        x: this.round(lineX),
        y: this.round(lineY + i * lineHeight),
        alignmentBaseline: "hanging",
        fill: color
      };

      lines[i] = <text {...textProps}>{text}</text>;
    }

    return <g key={`${x}-${y}`}>{lines}</g>;
  }

  getPixelData(): Array<{ text: string, color: string }> {
    const { data } = this.props;
    const pixelData = new Array(3);
    const color = this.getColorFromData(data);

    for (let i = 3; i--; ) {
      pixelData[i] = {
        color,
        text: this.getTextFromComponent(data[i])
      };
    }

    return pixelData;
  }

  getColorFromData(data: Array<number>): string {
    const colorComponents = data.slice(0, 3);
    const alpha = data[3];

    if (alpha === 255) {
      return this.rgbToHexadecimal(colorComponents);
    }

    const rgba = colorComponents.concat([alpha / 255]).join(",");

    return `rgba(${rgba})`;
  }

  getTextFromComponent(component: number): string {
    const value = component.toString();

    return "0".repeat(3).substr(0, 3 - value.length).concat(value);
  }

  round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  rgbToHexadecimal(components: Array<number>): string {
    return components.reduce((hex, n) => {
      return hex + n < 16 ? "0" : "" + n.toString(16);
    }, "#");
  }
}
