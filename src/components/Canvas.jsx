import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pixel from './Pixel';
import BackgroundImage from './BackgroundImage';
import BackgroundColor from './BackgroundColor';
import * as actions from '../actions/settings';

const mapStateToProps = (state) => ({
  fonts: state.fonts,
  image: state.image,
  settings: state.settings
});

@connect(mapStateToProps, actions)
export default class Canvas extends Component {
  /**
   * @inheritDoc
   */
  componentWillReceiveProps(nextProps) {
    const {
      image,
      fonts,
      settings
    } = nextProps;
    
    if (!image) {
      return;
    }
    
    const { fontFamily, fontSize, maxSize } = settings;
    const { naturalWidth, naturalHeight } = image;
    const imageRatio = naturalWidth / naturalHeight;
    
    let width;
    let height;
    
    const {
      coef,
      dx,
      dy,
      width: fontWidth,
      height: fontHeight,
      ratio: fontRatio,
    } = fonts[fontFamily];
    
    const font = {
      fontSize,
      fontFamily,
      fontRatio,
      dx: dx * fontSize,
      dy: dy * fontSize,
      height: fontHeight * fontSize,
      width: fontWidth * fontSize
    };

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
    
    this.setState({
      canvas,
      context,
      font,
    });
  }
  
  /**
   * @inheritDoc
   */
  render() {
    if (!this.props.image) {
      return null;
    }

    const {
      canvas: { width: canvasWidth },
      font: {
        dx,
        dy,
        fontFamily,
        fontSize,
        fontRatio,
        height: fontHeight,
        width: fontWidth
      },
    } = this.state;
    
    const pixelW = (fontWidth + dx) * 3 + dx;
    const pixelH = (fontHeight + dy) * 3 + dy;
    const pixelRatio = pixelW / pixelH;
    const height = canvasWidth / pixelRatio;
    
    const props = {
      preserveAspectRatio: 'none',
      fontFamily: `${fontFamily}, monospace`,
      fontSize,
      width: canvasWidth,
      height: canvasWidth,
      viewBox: `0 0 ${canvasWidth} ${height}`
    };

    return (
      <svg {...props}>
        {this.drawBackgroundColor()}
        {this.drawBackground()}
        {this.drawPixels()}
      </svg>
    );
  }
  
  /**
   *
   */
  drawBackground() {
    const { backgroundAlpha } = this.props.settings;
    const { canvas } = this.state;
    
    return (
      <BackgroundImage 
        canvas={canvas}
        opacity={backgroundAlpha} />
    );
  }
  
  /**
   *
   */
  drawBackgroundColor() {
    const {
      backgroundColor,
      backgroundColorAlpha
    } = this.props.settings;
    
    return (
      <BackgroundColor 
        color={backgroundColor}
        opacity={backgroundColorAlpha} />
    );
  }
  
  /**
   * 
   */
  drawPixels(): Array {
    const {
      canvas: { width, height },
      context,
      font
    } = this.state;
    
    const { rvb, contrast } = this.props.settings;

    const offset = font.width * 3;
    const countW = Math.ceil(width / offset);
    const countH = Math.ceil(height / offset);
    const size = width / countW;
    
    const pixels = new Array(countW * countH);
    const pixelProps = { contrast, font, rvb };
    let key = 0;
    
    for (let y = countH; y--;) {
      for (let x = countW; x--; key++) {
        const data = Array.from(
          context
            .getImageData(x * size, y * size, 1, 1)
            .data
        );
        
        pixels.push(
          <Pixel key={key} x={x} y={y} data={data} {...pixelProps} />
        );
      }
    }
    
    return pixels;
  }
}
