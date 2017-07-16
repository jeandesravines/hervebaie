import React from "react";
import { mount, shallow } from "enzyme";
import RgbPixel from "../../lib/components/RgbPixel";

describe("render", () => {
  it("renders without crashing", () => {
    const props = {
      x: 0,
      y: 0,
      data: [255, 0, 0, 255],
      font: {x: 0, y: 0, width: 4.8, height: 6.4},
      contrast: 0.4
    };

    mount(
      <RgbPixel {...props} />
    );
  });

  it("should be a 'g' element", () => {
    const props = {
      x: 0,
      y: 0,
      data: [255, 0, 0, 255],
      font: {dx: 0, dy: 0, width: 4.8, height: 6.4},
      contrast: 0.4
    };

    const wrapper = shallow(
      <RgbPixel {...props} />
    );

    expect(wrapper.name()).toBe("g");
  });

  it("should have three 'text' elements", () => {
    const props = {
      x: 5,
      y: 10,
      data: [255, 255, 255, 255],
      font: {dx: 2, dy: 3, width: 4.8, height: 6.4},
      contrast: 0.4
    };

    const wrapper = shallow(
      <RgbPixel {...props} />
    );

    const childs = wrapper.find("text");
    const colors = ["#ff0000", "#00ff00", "#0000ff"];

    expect(childs).toHaveLength(3);

    childs.forEach((child, i) => {
      expect(child.text()).toBe("255");
      expect(child.props()).toMatchObject({
        x: 104,
        y: 285 + i * 9.4,
        alignmentBaseline: "hanging",
        fill: colors[i]
      });

    });
  });
});

describe("getPixelData", () => {
  it("returns pixel data", () => {
    const props = {
      x: 5,
      y: 10,
      data: [255, 255, 255, 255],
      font: {dx: 2, dy: 3, width: 4.8, height: 6.4},
      contrast: 0.4
    };

    const wrapper = shallow(
      <RgbPixel {...props} />
    );

    const result = wrapper.instance()
      .getPixelData();

    expect(result).toEqual(expect.arrayContaining([
      {color: "#ff0000", text: "255"},
      {color: "#00ff00", text: "255"},
      {color: "#0000ff", text: "255"}
    ]));
  });

  it("returns pixel data with rgba colors", () => {
    const props = {
      x: 5,
      y: 10,
      data: [13, 14, 15, 127],
      font: {dx: 2, dy: 3, width: 4.8, height: 6.4},
      contrast: 0.4
    };

    const wrapper = shallow(
      <RgbPixel {...props} />
    );

    const result = wrapper.instance()
      .getPixelData();

    expect(result).toEqual(expect.arrayContaining([
      {color: "rgba(109,0,0,0.5)", text: "013"},
      {color: "rgba(0,110,0,0.5)", text: "014"},
      {color: "rgba(0,0,111,0.5)", text: "015"}
    ]));
  });
});

describe("getDarkerComponent", () => {
  it("returns the min value", () => {
    expect(RgbPixel.getDarkerComponent(0, -0.5)).toBe(0);
  });

  it("returns the max value", () => {
    expect(RgbPixel.getDarkerComponent(255, 0.5)).toBe(255);
  });

  it("returns a lighter value", () => {
    expect(RgbPixel.getDarkerComponent(127, 0.5)).toBe(191);
  });

  it("returns a darker value", () => {
    expect(RgbPixel.getDarkerComponent(127, -0.5)).toBe(63);
  });
});
