import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pixel from './Pixel';
import * as actions from '../actions/settings';

const mapStateToProps = (state) => ({
  fonts: state.fonts,
  image: state.image,
  settings: state.settings,
});

type Props = {
  image: ?Image,
  fonts: Array<{
    [font_family: string]: {
      name: string,
      coef: ?number,
      dx: ?number,
      dy: ?number,
      width: ?number,
      height: ?number,
    }
  }>,
  settings: Object,
};

type State = {
  canvas: ?HTMLCanvasElement,
  context: ?CanvasRenderingContext2D,
  font: {
    fontSize: number,
    fontFamily: string,
    fontRatio: number,
    dx: number,
    dy: number,
    height: number,
    width: number,
  }
};

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
  componentWillReceiveProps(nextProps: Props) {
    const {
      image,
      fonts,
      settings,
    } = nextProps;
    
    if (!image) {
      return;
    }
    
    const { fontFamily, fontSize, maxSize } = settings;
    const { naturalWidth, naturalHeight } = image;
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

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    
    const {
      coef,
      dx,
      dy,
      width: fontWidth,
      height: fontHeight,
    } = fonts[fontFamily];
    
    const fontCoef = fontSize * coef;
    const font = {
      fontSize,
      fontFamily,
      fontRatio: fontWidth / fontHeight,
      dx: dx * fontCoef,
      dy: dy * fontCoef,
      height: fontHeight * fontCoef,
      width: fontWidth * fontCoef,
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
  shouldComponentUpdate(nextProps: Props): boolean {
    return !!nextProps.image;
  }
  
  /**
   * @inheritDoc
   */
  render(): SVGElement {
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
  
  /**
   *
   */
  drawBackground(): SVGImageElement {
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
  
  /**
   *
   */
  drawBackgroundColor(): SVGRectElement {
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
  
  /**
   * 
   */
  drawPixels(): Array {
    const {
      canvas: { width, height },
      font: { width: fontWidth },
      settings : { rvb, contrast }
    } = this.state;

    const offset = fontWidth * 3;
    const countW = width / offset;
    const countH = height / offset;
    const size = width / countW;
    
    const pixels = [];
    const pixelProps = { contrast, data, font, rvb };
    
    for (let x = 0; x < countW; x ++) {
      for (let y = 0; y < countH; y ++) {
        const data = Array.from(
          this.props.context
            .getImageData(x * size, y * size, 1, 1)
            .data
        );
        
        pixels.push(
          <Pixel x={x} y={y} data={data} {...props} />
        );
      }
    }
    
    return pixels;
  }
}
