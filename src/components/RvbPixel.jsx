import React from 'react';
import Pixel from './Pixel';

export default class RvbPixel extends Pixel {
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
    rvb: bool,
    contrast: bool
  };

  /**
   * @override
   */
  getPixelData(): Array<{text: string, color: string}> {
    const { data, contrast } = this.props;
    const pixelData = new Array(3);
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
    
    return pixelData;
  }
}
