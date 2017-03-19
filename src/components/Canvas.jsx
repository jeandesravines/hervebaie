import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  fonts: state.fonts,
  image: state.image.image,
  settings: state.settings,
});

@connect(mapStateToProps)
export default class Canvas extends Component {  
  render() {
    if (!this.props.image) {  
      return null;
    }
    
    const {
      backgroundAlpha,
      backgroundColor,
      backgroundColorAlpha,
      fontFamily,
      fontSize,
      maxSize,
    } = this.props.settings;
    
    const {
      naturalWidth,
      naturalHeight,
    } = this.props.image;
    
    const selectedFont = this.props.fonts[fontFamily];
    const fontRatio = selectedFont.width / selectedFont.height;
    const ratio = naturalWidth / naturalHeight;
    let width;
    let height;
    
    if (naturalWidth > naturalHeight) {
      width = maxSize;
      height = maxSize * ratio;
    } else {
      width = maxSize / ratio;
      height = maxSize;
    }
    
    const context = this.getContext(width, height);
    const props = {
      preserveAspectRatio: 'none',
      fontFamily,
      fontSize,
      viewBox: `0 0 ${width} ${height / fontRatio}`,
    };
    
    return (
      <svg {...props}>
        {this.drawPixels(context, width, height)}
      </svg>
    );
  }
  
  drawPixels(context, canvasWidth, canvasHeight) {    
    const {
      fontFamily,
      fontSize,
      maxSize,
    } = this.props.settings;

    const selectedFont = this.props.fonts[fontFamily];
    const fontRatio = fontSize / 10;
    const fontWidth = selectedFont.width * fontRatio;
    const fontHeight = selectedFont.height * fontRatio;
    const font = {
      dx: selectedFont.dx,
      dy: selectedFont.dy,
      width: fontWidth,
      height: fontHeight,
    };

    const {
      naturalWidth,
    } = this.props.image;

    const pixelSize = fontWidth * 3;
    const countW = canvasWidth / pixelSize;
    const countH = canvasHeight / pixelSize;
    const offset = naturalWidth / countW;
    const pixels = [];
    
    for (let i = 0; i < countW; i ++) {
      for (let j = 0; j < countH; j ++) {
        pixels.push(
          this.drawPixel(context, font, i, j, offset)
        );
      }
    }
    
    return pixels;
  }
  
  drawPixel(context, font, x, y, offset) {
    const { width, height, dx, dy } = font;
    const pixelX = x * width * 3;
    const pixelY = y * height * 3;
    
    const data = context.getImageData(x * offset, y * offset, 1, 1).data;
    const rgba = Array.from(data)
      .slice(0, 3)
      .concat([data[3] / 255])
      .join(',');

    const lines = [1, 2, 3].map((i) => {
      const props = {
        x: pixelX,
        y: pixelY + i * height,
        dx,
        dy,
        alignmentBaseline: 'hanging',
        fill: `rgba(${rgba})`,
      };

      const value = data[i].toString();
      const text = '0'.repeat(3)
        .substr(0, 3 - value.length)
        .concat(value);

      return (
        <text key={i} {...props}>{text}</text>
      );
    });
    
    return (
      <g key={x + '-' + y}>{lines}</g>
    );
  }
  
  getContext(width, height) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    context.drawImage(this.props.image, 0, 0);
    
    return context;
  }
}
