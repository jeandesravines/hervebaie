import React, { Component } from 'react';

export default class Pixel extends Component {
  props: {
    x: number,
    y: number,
    data: Array<number>,
    font: {
      width: number,
      height: number,
      dx: number,
      dy: number
    },
    rvb: boolean,
    contrast: number
  };
  
  /**
   *
   */
  render() {
    const { 
      x, 
      y,
      font: { width, height, dx, dy }
    } = this.props;
    
    const lineHeight = height + dy;
    const lineWidth = width + dx;
    const lineX = x * lineWidth * 3 + dx;
    const lineY = y * lineHeight * 3 + dy;
    const pixelData = this.getPixelData();
    const lines = new Array(3);
    
    for (let i = 3; i--;) {
      const { color, text } = pixelData[i];
      const props = {
        key: i,
        x: lineX,
        y: lineY + i * lineHeight,
        alignmentBaseline: 'hanging',
        fill: color
      };

      lines[i] = (
        <text {...props}>{text}</text>
      );
    }
    
    return (
      <g key={`${x}-${y}`}>{lines}</g>
    );
  }
  
  /**
   * 
   */
  getPixelData(): Array<{text: string, color: string}> {
    const { data, rvb, contrast } = this.props;
    const pixelData = new Array(3);
    
    if (rvb) {
      const pattern = data.slice(0).fill(0, 0, 3);
     
      for (let i = 3; i--;) {
        const components = pattern.slice(0);
        const component = data[i];
        
        components[i] = this.getDarkerComponent(component, contrast);
        pixelData[i] = {
          color: this.getColorFromData(components),
          text: this.getTextFromComponent(component),
        };
      }
    } else {
      const color = this.getColorFromData(data);
      
      for (let i = 3; i--;) {
        pixelData[i] = {
          color,
          text: this.getTextFromComponent(data[i]),
        };
      }
    }
    
    return pixelData;
  }
  
  /**
   * 
   */
  getColorFromData(data: number[]): string {
    const rgba = data.slice(0, 3)
      .concat([data[3] / 255])
      .join(',');
    
    return `rgba(${rgba})`;
  }
  
  /**
   * 
   */
  getTextFromComponent(component: Array<number>): string {
    const value = component.toString();

    return '0'.repeat(3)
      .substr(0, 3 - value.length)
      .concat(value);
  }

  /**
   * 
   */
  getDarkerComponent(component: number, contrast: number): number {
    return Math.floor(component + (255 - component) * contrast);
  }
}
