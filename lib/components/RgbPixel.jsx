import Pixel from "./Pixel";

type Props = {
  x: number,
  y: number,
  data: Array<number>,
  font: {
    width: number,
    height: number,
    dx: number,
    dy: number
  },
  +contrast: boolean
};

export default class RgbPixel extends Pixel<void, Props> {
  /**
   * @return {Array}
   */
  getPixelData(): Array<{ text: string, color: string }> {
    const { data, contrast } = this.props;
    const pixelData = new Array(3);
    const pattern = data.slice(0).fill(0, 0, 3);

    for (let i = 3; i--; ) {
      const components = pattern.slice(0);
      const component = data[i];

      components[i] = RgbPixel.getDarkerComponent(component, contrast);
      pixelData[i] = {
        color: Pixel.getColorFromData(components),
        text: Pixel.getTextFromComponent(component)
      };
    }

    return pixelData;
  }

  /**
   * @param {number} component
   * @param {contrast} number
   * @return {number}
   */
  static getDarkerComponent(component: number, contrast: number): number {
    return Math.max(0, Math.floor(component + (255 - component) * contrast));
  }
}
