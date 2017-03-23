import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/settings';

const mapStateToProps = (state) => ({
  fonts: state.fonts,
  image: state.image,
  settings: state.settings,
});

@connect(mapStateToProps, actions)
export default class Canvas extends Component {
  state = {
    canvas: null,
    context: null,
    font: null,
  };
  
  /**
   * @inheritDoc
   */
  componentWillReceiveProps(nextProps) {
    const {
      image,
      fonts,
      settings,
    } = nextProps;
    
    if (!image) {
      return;
    }
    
    const { naturalWidth, naturalHeight } = image;
    const imageMaxSize = Math.max(naturalWidth, naturalHeight);
    const imageRatio = naturalWidth / naturalHeight;
    const maxSize = settings.maxSize;// Math.min(settings.maxSize, imageMaxSize);
    const maxSizeRatio = maxSize / settings.maxSize;
    
    let width;
    let height;

    if (imageRatio > 0) {
      width = maxSize;
      height =  maxSize / imageRatio;
    } else {
      width = maxSize * imageRatio;
      height = maxSize;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    
    const { fontFamily } = settings;
    const fontSize = Math.max(1, settings.fontSize * maxSizeRatio);
    const fontCoef = fontSize / 10;
    const {
      dx,
      dy,
      width: fontWidth,
      height: fontHeight,
    } = fonts[fontFamily];

    const font = {
      fontSize,
      fontFamily,
      fontRatio: fontWidth / fontHeight,
      dx: dx * fontCoef,
      dy: dy * fontCoef,
      width: fontWidth * fontCoef,
      height: fontHeight * fontCoef,
    };
    
    this.setState({
      canvas,
      context,
      font,
    });
  }
  
  /**
   * @inheritDoc
   */
  shouldComponentUpdate(nextProps) {
    return !!nextProps.image;
  }
  
  /**
   * @inheritDoc
   */
  render() {
    if (!this.props.image) {
      return null;
    }

    const {
      canvas: { height, width },
      font: { fontFamily, fontSize, fontRatio },
    } = this.state;
    
    const props = {
      preserveAspectRatio: 'none',
      fontFamily: `${fontFamily}, monospace`,
      fontSize,
      viewBox: `0 0 ${width} ${height / fontRatio}`,
    };

    return (
      <svg {...props}>
        {this.drawBackgroundColor()}
        {this.drawBackground()}
        {this.drawPixels()}
      </svg>
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
  
  drawPixel(x, y, offset) {
    const { width, height, dx, dy } = this.state.font;
    const pixelX = x * width * 3;
    const pixelY = y * (height + dy) * 3;
    
    const data = this.state.context
      .getImageData(x * offset, y * offset, 1, 1)
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
        dy: dy,
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
  
  drawPixels() {
    const {
      canvas: { width, height },
      font: { width: fontWidth },
    } = this.state;

    const pixelSize = fontWidth * 3;
    const countW = width / pixelSize;
    const countH = height / pixelSize;
    const offset = width / countW;
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
}
