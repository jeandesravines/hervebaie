import React from "react";
import { shallow, mount } from "enzyme";
import Pixel from "../../lib/components/Pixel";

describe("rgbToHexadecimal", () => {
  it("returns a prefixed string with '#'", () => {
    expect(Pixel.rgbToHexadecimal([255, 15, 15])).toBe("#ff0f0f");
  });
});

describe("round", () => {
  it("returns a rounded value", () => {
    expect(Pixel.round(1.12345)).toBe(1.12);
  });

  it("returns a rounded up value", () => {
    expect(Pixel.round(1.6789)).toBe(1.68);
  });
});

describe("getTextFromComponent", () => {
  it("returns well formed strings", () => {
    expect(Pixel.getTextFromComponent(0)).toBe("000");
    expect(Pixel.getTextFromComponent(1)).toBe("001");
    expect(Pixel.getTextFromComponent(10)).toBe("010");
    expect(Pixel.getTextFromComponent(100)).toBe("100");
  });
});

describe("getColorFromData", () => {
  it("returns an hexadecimal value", () => {
    expect(Pixel.getColorFromData([255, 15, 15, 255])).toBe("#ff0f0f");
  });

  it("returns a rgba value", () => {
    expect(Pixel.getColorFromData([255, 127, 56, 127]))
      .toBe("rgba(255,127,56,0.5)");
  });
});

describe("render", () => {
  it("renders without crashing", () => {
    const props = {
      x: 0,
      y: 0,
      data: [ 255, 0, 0, 255 ],
      font: { x: 0, y: 0, width: 4.8, height: 6.4 }
    };

    mount(
      <Pixel {...props} />
    );
  });

  it("should be a 'g' element", () => {
    const props = {
      x: 0,
      y: 0,
      data: [ 255, 0, 0, 255 ],
      font: { dx: 0, dy: 0, width: 4.8, height: 6.4 }
    };

    const wrapper = shallow(
      <Pixel {...props} />
    );

    expect(wrapper.name()).toBe("g");
  });

  it("should have three 'text' elements", () => {
    const props = {
      x: 5,
      y: 10,
      data: [ 13, 14, 15, 255 ],
      font: { dx: 2, dy: 3, width: 4.8, height: 6.4 }
    };

    const wrapper = shallow(
      <Pixel {...props} />
    );

    const childs = wrapper.find("text");
    const texts = [ "013", "014", "015" ];

    expect(childs).toHaveLength(3);

    childs.forEach((child, i) => {
      expect(child.props()).toMatchObject({
        x: 104,
        y: 285 + i * (9.4),
        alignmentBaseline: "hanging",
        fill: "#0d0e0f",
        children: texts[i]
      });
    });
  });
});

describe("getPixelData", () => {
  it("returns pixel data with haxadecimal colors", () => {
    const props = {
      x: 5,
      y: 10,
      data: [ 13, 14, 15, 255 ],
      font: { dx: 2, dy: 3, width: 4.8, height: 6.4 }
    };

    const wrapper = shallow(
      <Pixel {...props} />
    );

    const result = wrapper.instance()
      .getPixelData();

    expect(result).toEqual(expect.arrayContaining([
      { color: "#0d0e0f", text: "013" },
      { color: "#0d0e0f", text: "014" },
      { color: "#0d0e0f", text: "015" }
    ]));
  });

  it("returns pixel data with rgba colors", () => {
    const props = {
      x: 5,
      y: 10,
      data: [ 13, 14, 15, 127 ],
      font: { dx: 2, dy: 3, width: 4.8, height: 6.4 }
    };

    const wrapper = shallow(
      <Pixel {...props} />
    );

    const result = wrapper.instance()
      .getPixelData();

    expect(result).toEqual(expect.arrayContaining([
      { color: "rgba(13,14,15,0.5)", text: "013" },
      { color: "rgba(13,14,15,0.5)", text: "014" },
      { color: "rgba(13,14,15,0.5)", text: "015" }
    ]));
  });
});
