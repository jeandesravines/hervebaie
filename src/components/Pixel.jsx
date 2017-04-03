import React, { Component, PropTypes } from 'react';

export default class Pixel extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    font: PropTypes.object.isRequired,
    rvb: PropTypes.bool,
    contrast: PropTypes.number.isRequired,
  };
  
  /**
   * 
   */
  getPixelData(): Array {
    const { contrast, data, rvb } = this.props;
    const pixelData = [];
    
    if (rvb) {
      const pattern = data.slice(0).fill(0, 0, 3);
     
      for (let i = 3; i--;) {
        const components = pattern.slice(0);
        const component = data[i];
        
        components[i] = this.darker(component, contrast);
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
  getColorFromData(data: Array): string {
    const rgba = data.slice(0, 3)
      .concat([data[3] / 255])
      .join(',');
    
    return `rgba(${rgba})`;
  }
  
  /**
   * 
   */
  getTextFromComponent(component: number): string {
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
  
  /**
   *
   */
  render() {
    const { 
      x, 
      y,
      font: { width, height, dx, dy }
    } = this.props;
    
    const pixelHeight = height + dy;
    const pixelWidth = width + dx;
    const pixelX = x * pixelWidth * 3 + dx;
    const pixelY = y * pixelHeight * 3 + dy;
    const pixelData = this.getPixelData();
    
    const lines = [0, 1, 2].map((i) => {
      const { color, text } = pixelData[i];
      const props = {
        key: i,
        x: pixelX,
        y: pixelY + i * pixelHeight,
        alignmentBaseline: 'hanging',
        fill: color,
      };

      return (
        <text {...props}>{text}</text>
      );
    });
    
    return (
      <g key={`${x}-${y}`}>{lines}</g>
    );
  }  
}
