import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  fonts: state.fonts,
  image: state.image,
  settings: state.settings,
});

@connect(mapStateToProps)
export default class Canvas extends Component {
  state = {
    canvas: null,
    context: null,
    font: null,
  };
  
  componentWillReceiveProps(nextProps) {
    const {
      image,
      fonts,
      settings,
    } = nextProps;
    
    if (image === null) {
      return;
    }
    
    const {
      fontName,
      fontSize,
    } = settings;
    
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    
    const selectedFont = fonts[fontName];
    const fontRatio = selectedFont.width / selectedFont.height;
    const fontCoef = fontSize / 10;
    const fontWidth = selectedFont.width * fontCoef;
    const fontHeight = selectedFont.height * fontCoef;

    const font = {
      fontSize,
      fontFamily: selectedFont.fontFamily,
      dx: selectedFont.dx * fontRatio,
      dy: selectedFont.dy * fontRatio,
      coef: fontCoef,
      ratio: fontRatio,
      width: fontWidth,
      height: fontHeight,
    };
    
    this.setState({
      canvas,
      context,
      font,
    });
  }
  
  shouldComponentUpdate(nextProps) {
    return nextProps.image !== null;
  }
  
  render() {
    const image = this.props.image;

    if (!image) {
      return null;
    }

    const {
      naturalWidth,
      naturalHeight,
    } = image;
    
    const {
      maxSize,
    } = this.props.settings;

    const {
      fontFamily,
      fontSize,
    } = this.state.font;
    
    const imageRatio = naturalWidth / naturalHeight;
    let width;
    let height;

    if (imageRatio > 0) {
      width = maxSize;
      height =  maxSize / imageRatio;
    } else {
      width = maxSize * imageRatio;
      height = maxSize;
    }

    const props = {
      preserveAspectRatio: 'none',
      fontFamily,
      fontSize,
      viewBox: `0 0 ${width} ${height}`,
    };

    return (
      <svg {...props}>
        {this.drawBackgroundColor()}
        {this.drawBackground()}
        {this.drawPixels(width, height)}
      </svg>
    );
  }
  
  drawBackgroundColor() {
    const {
      backgroundColor,
      backgroundColorAlpha,
    } = this.props.settings;
    
    return (
      <rect fill={backgroundColor}
        opacity={backgroundColorAlpha}
        width="100%"
        height="100%" />
    );
  }
  
  drawBackground() {
    const {
      backgroundAlpha,
    } = this.props.settings;
    
    return (
      <image href={this.state.canvas.toDataURL()}
        opacity={backgroundAlpha}
        preserveAspectRatio="none"
        width="100%"
        height="100%" />
    );
  }
  
  drawPixels() {
    const {
      width,
      height,
    } = this.state.canvas;

    const {
      width: fontWidth,
    } = this.state.font;
    
    const {
      naturalWidth,
    } = this.props.image;

    const pixelSize = fontWidth * 3;
    const countW = width / pixelSize;
    const countH = height / pixelSize;
    const offset = naturalWidth / countW;
    const pixels = [];
    
    for (let i = 0; i < countW; i ++) {
      for (let j = 0; j < countH; j ++) {
        pixels.push(
          this.drawPixel(i, j, offset)
        );
      }
    }
    
    return pixels;
  }
  
  drawPixel(x, y, offset) {
    const { width, height, dx, dy } = this.state.font;
    const pixelX = x * width * 3;
    const pixelY = y * (height + dy) * 3;
    
    const data = this.state.context
      .getImageData(x * offset, y * offset, offset, offset)
      .data;
    
    const rgba = Array.from(data)
      .slice(0, 3)
      .concat([data[3] / 255])
      .join(',');

    const lines = [0, 1, 2].map((i) => {
      const props = {
        x: pixelX,
        y: pixelY + i * height,
        dx,
        dy: dy * i,
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
      <g key={`${x}-${y}`}>{lines}</g>
    );
  }
}
