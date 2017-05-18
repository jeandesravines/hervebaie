import React, { Component } from "react";
import { connect } from "react-redux";

import Pixel from "./Pixel";
import RgbPixel from "./RgbPixel";
import BackgroundImage from "./BackgroundImage";
import BackgroundColor from "./BackgroundColor";
import { setSvgData } from "../actions/svg-data";

const mapStateToProps = state => ({
  fonts: state.fonts,
  image: state.image,
  settings: state.settings
});

@connect(mapStateToProps, { setSvgData })
export default class PixelList extends Component {
  svgNode: ?HTMLElement;

  props: {
    fonts: Array,
    image: ?HTMLImageElement,
    settings: Object,
    setSvgData: Function
  };

  state: {
    font: ?Object,
    canvas: ?HTMLCanvasElement
  } = {};

  shouldComponentUpdate({ image }): boolean {
    return !!image;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.image) {
      return;
    }

    this.setState({
      canvas: this.getCanvas(nextProps),
      font: this.getFont(nextProps)
    });
  }

  render() {
    if (!this.props.image) {
      return null;
    }

    const { fontSize } = this.props.settings;
    const {
      canvas: { width, height },
      font: {
        dx,
        dy,
        fontFamily,
        height: fontHeight,
        width: fontWidth
      }
    } = this.state;

    const pixelW = (fontWidth + dx) * 3;
    const pixelH = (fontHeight + dy) * 3;
    const pixelRatio = pixelW / pixelH;
    
    const viewBoxH = Math.round(height / pixelRatio);
    const viewBox = `0 0 ${width} ${viewBoxH}`;

    const svgProps = {
      preserveAspectRatio: "none",
      fontFamily,
      fontSize,
      width,
      height,
      viewBox
    };

    return (
      <svg {...svgProps} ref={n => this.svgNode = n}>
        {this.drawBackgroundColor()}
        {this.drawBackground()}
        {this.drawPixels()}
      </svg>
    );
  }

  componentDidUpdate() {
    const data = this.svgNode.outerHTML
      .replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
      .replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    
    this.props.setSvgData(
      new Blob([data], {
        type: "image/svg+xml;charset=utf-8"
      })
    );
  }

  getCanvas({ image, settings }): HTMLCanvasElement {
    const { maxSize } = settings;
    const { naturalWidth, naturalHeight } = image;
    const imageRatio = naturalWidth / naturalHeight;

    let width;
    let height;

    if (imageRatio > 0) {
      width = maxSize;
      height = maxSize / imageRatio;
    } else {
      width = maxSize * imageRatio;
      height = maxSize;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, width, height);

    return canvas;
  }

  getFont({ fonts, settings }): Object {
    const { fontName, fontSize } = settings;
    const { dx, dy, width, height, family } = fonts[fontName];

    return {
      fontSize,
      fontFamily: family,
      dx: dx * fontSize,
      dy: dy * fontSize,
      height: height * fontSize,
      width: width * fontSize
    };
  }

  drawBackground() {
    const { backgroundAlpha } = this.props.settings;
    const { canvas } = this.state;

    return <BackgroundImage canvas={canvas} opacity={backgroundAlpha} />;
  }

  drawBackgroundColor() {
    const { backgroundColor, backgroundColorAlpha } = this.props.settings;

    return (
      <BackgroundColor color={backgroundColor} opacity={backgroundColorAlpha} />
    );
  }

  drawPixels(): Array {
    const { settings } = this.props;
    const { canvas, font } = this.state;
    const { width, height } = canvas;
    const sizeW = font.width * 3;
    const sizeH = font.width * 3;
    const countW = Math.ceil(width / sizeW);
    const countH = Math.ceil(height / sizeH);

    const pixels = new Array(countW * countH);
    const PixelComponent = rgb ? RgbPixel : Pixel;
    const canvasContext = canvas.getContext("2d");
    const { rgb, contrast } = settings;
    const pixelProps = { contrast, font };

    for (let y = countH; y--; ) {
      const dataY = Math.floor(y * sizeH);

      for (let x = countW; x--; ) {
        const dataX = Math.floor(x * sizeW);
        const data = Array.from(
          canvasContext.getImageData(dataX, dataY, 1, 1).data
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
