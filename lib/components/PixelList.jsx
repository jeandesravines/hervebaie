import React, { Component } from "react";
import { connect } from "react-redux";

import Pixel from "./Pixel";
import RgbPixel from "./RgbPixel";
import BackgroundImage from "./BackgroundImage";
import BackgroundColor from "./BackgroundColor";
import { setSvgData } from "../actions/svg-data";

type Font = {
  dx: number,
  dy: number,
  name: string,
  family: string,
  height: number,
  width: number
};

type Props = {
  fonts: ?Object<Font>,
  image: ?HTMLImageElement,
  setSvgData: (Object) => Object,
  settings: Object<string | number | boolean>
};

type State = {
  +canvas: ?HTMLCanvasElement,
  +font: ?Object
};

/**
 * @const {Function(Object): Object}
 */
const mapStateToProps = state => ({
  fonts: state.fonts,
  image: state.image,
  settings: state.settings
});

/**
 * @const {Object.<string, Function>}
 */
const mapDispatchToProps = {
  setSvgData
};

export class PixelList extends Component<void, Props, State> {
  /**
   * @const {Object}
   */
  state: State = {};

  /**
   * @var {?HTMLElement}
   */
  nodeRef: ?HTMLElement;

  /**
   * @inheritDoc
   */
  shouldComponentUpdate(props: Props): boolean {
    return props.image ? true : false;
  }

  /**
   * @inheritDoc
   */
  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.image) {
      return;
    }

    this.setState({
      canvas: PixelList.getCanvas(nextProps),
      font: PixelList.getFont(nextProps)
    });
  }

  /**
   * @inheritDoc
   */
  render() {
    if (!this.props.image) {
      return null;
    }

    if (!this.state.canvas) {
      return null;
    }

    const {fontSize} = this.props.settings;
    const {
      canvas: {width, height},
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
      <svg
        {...svgProps}
        ref={n => this.nodeRef = n}>
          {PixelList.getBackgroundColor(this.props)}
          {PixelList.getBackgroundImage(this.props, this.state)}
          {PixelList.getPixels(this.props, this.state)}
      </svg>
    );
  }

  /**
   * @inheritDoc
   */
  componentDidUpdate() {
    const data = this.nodeRef.outerHTML
      .replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"')
      .replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');

    this.props.setSvgData(
      new Blob([data], {
        type: "image/svg+xml;charset=utf-8"
      })
    );
  }

  /**
   * @param {{
   *   image: HTMLImageElement,
   *   settings: Object
   * }} props
   * @return {HTMLCanvasElement}
   */
  static getCanvas(props: Props): HTMLCanvasElement {
    const {image, settings} = props;
    const {maxSize} = settings;

    const imageWidth = image.naturalWidth || image.width;
    const imageHeight = image.naturalHeight || image.height;
    const imageRatio = imageHeight / imageWidth;

    let width;
    let height;

    if (imageRatio > 1) {
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

  /**
   * @param {{
   *   fonts: Object,
   *   settings: Object
   * }} props
   * @return {Object}
   */
  static getFont(props: Props): Object {
    const {fonts, settings} = props;
    const {fontName, fontSize} = settings;
    const {dx, dy, width, height, family} = fonts[fontName];

    return {
      fontSize,
      fontFamily: family,
      dx: dx * fontSize,
      dy: dy * fontSize,
      height: height * fontSize,
      width: width * fontSize
    };
  }

  /**
   * @param {{
   *   settings: Object
   * }} props
   * @param {{
   *   canvas: HTMLCanvasElement
   * }} state
   * @return {*}
   */
  static getBackgroundImage(props: Props, state: State) {
    const {backgroundImageAlpha} = props.settings;
    const {canvas} = state;

    return (
      <BackgroundImage
        canvas={canvas}
        opacity={backgroundImageAlpha} />
    );
  }

  /**
   * @param {{
   *   settings: Object
   * }} props
   * @return {*}
   */
  static getBackgroundColor(props: Props) {
    const {backgroundColor, backgroundColorAlpha} = props.settings;

    return (
      <BackgroundColor
        color={backgroundColor}
        opacity={backgroundColorAlpha} />
    );
  }

  /**
   * @param {{
   *   settings: Object
   * }} props
   * @param {{
   *   canvas: HTMLCanvasElement,
   *   font: Object
   * }} state
   * @return {Array}
   */
  static getPixels(props: Props, state: State): Array {
    const {settings} = props;
    const {canvas, font} = state;
    const {rgb, contrast} = settings;
    const {width, height} = canvas;
    const sizeW = font.width * 3;
    const sizeH = font.width * 3;
    const countW = Math.ceil(width / sizeW);
    const countH = Math.ceil(height / sizeH);

    const PixelComponent = rgb ? RgbPixel : Pixel;
    const canvasContext = canvas.getContext("2d");

    const pixelProps = {contrast, font};
    const pixels = [];

    for (let y = countH; y--;) {
      const dataY = Math.floor(y * sizeH);

      for (let x = countW; x--;) {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PixelList);
