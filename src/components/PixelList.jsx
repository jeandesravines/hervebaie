import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pixel from './Pixel';
import RgbPixel from './RgbPixel';
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
  node: ?HTMLEement;

  shouldComponentUpdate(nextProps): boolean {
    return !!nextProps.image;
  }
  
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
      }
    } = this.state;
    
    const pixelW = (fontWidth + dx) * 3 + dx;
    const pixelH = (fontHeight + dy) * 3 + dy;
    const pixelRatio = pixelW / pixelH;
    const height = canvasWidth / pixelRatio;
    
    const svgProps = {
      preserveAspectRatio: 'none',
      fontFamily: `${fontFamily}, monospace`,
      fontSize,
      width: canvasWidth,
      height: canvasWidth,
      viewBox: `0 0 ${canvasWidth} ${height}`
    };

    return (
      <svg {...svgProps} ref={n => this.node = n}>
        {this.drawBackgroundColor()}
        {this.drawBackground()}
        {this.drawPixels()}
      </svg>
    );
  }
  
  componentDidUpdate() {
    const data = this.node.outerHTML
      .replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
      .replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    
    const url = URL.createObjectURL(
      new Blob([data], {
        type: 'image/svg+xml;charset=utf-8'
      })
    );
    
    const link = document.createElement('a');

    link.href = url;
    link.taret = '_blank';
    link.download = 'hervebaie';
    link.click();
  }
  
  drawBackground() {
    const { backgroundAlpha } = this.props.settings;
    const { canvas } = this.state;
    
    return (
      <BackgroundImage 
        canvas={canvas}
        opacity={backgroundAlpha} />
    );
  }
  
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
  
  drawPixels(): Array {
    const {
      canvas: { width, height },
      context,
      font
    } = this.state;
    
    const offset = font.width * 3;
    const pixelW =  width / offset;
    const countW = Math.ceil(pixelW);
    const countH = Math.ceil(height / offset);
    const size = width / pixelW;
    
    const pixels = new Array(countW * countH);
    const { rgb, contrast } = this.props.settings;
    const pixelProps = { contrast, font };
    const PixelComponent = rgb ? RgbPixel : Pixel;
    
    for (let y = countH; y--;) {
      for (let x = countW; x--;) {
        const data = Array.from(
          context
            .getImageData(x * size, y * size, 1, 1)
            .data
        );
        
        pixels.push(
          <PixelComponent 
            {...pixelProps}
            key={`${x}-${y}`} 
            x={x} 
            y={y} 
            data={data} />
        );
      }
    }
    
    return pixels;
  }
}
