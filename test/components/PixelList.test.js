import React from "react";
import { shallow, mount } from "enzyme";
import ConnectedPixelList, { PixelList } from "../../src/components/PixelList";

beforeEach(() => {
  jest.spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue({
      drawImage: jest.fn()
    });
});

describe("getFont", () => {
  it("returns the associated font", () => {
    const font = PixelList.getFont({
      fonts: {
        Helvetica: {
          dx: 0.01,
          dy: 0.01,
          width: 1.2,
          height: 1.58,
          family: "Helvetica,monospace"
        }
      },
      settings: {
        fontName: "Helvetica",
        fontSize: 20
      }
    });
    
    expect(font).toMatchObject({
      dx: 0.2,
      dy: 0.2,
      fontFamily: "Helvetica,monospace",
      fontSize: 20,
      height: 31.6,
      width: 24
    });
  });
});

describe("getCanvas", () => {
  it("returns the associated font", () => {
    const font = PixelList.getCanvas({
      image: {
        naturalWidth: 800,
        naturalHeight: 600
      },
      settings: {
        maxSize: 1080
      }
    });

    expect(font).toMatchObject(
      expect.objectContaining({
        height: 810,
        width: 1080
      })
    );
  });
});

describe("shouldComponentUpdate", () => {
  beforeEach(() => {    
    jest.spyOn(PixelList.prototype, "render")
      .mockReturnValue();
  });

  test("should returns false", () => {
    const props = { image: null };
    const wrapper = shallow(
      <PixelList {...props} />
    );
    
    const shouldComponentUpdate = wrapper
      .instance()
      .shouldComponentUpdate(props);

    expect(shouldComponentUpdate).toBe(false);
  });

  test("should returns true", () => {
    const props = { image: new Image() };
    const wrapper = shallow(
      <PixelList {...props} />
    );
    
    const shouldComponentUpdate = wrapper
      .instance()
      .shouldComponentUpdate(props);

    expect(shouldComponentUpdate).toBe(true);
  });
});

describe("componentWillReceiveProps", () => {
  beforeEach(() => {    
    jest.spyOn(PixelList.prototype, "render")
      .mockReturnValue(null);
  });
  
  test("should do nothing - no props.image", () => {
    const spySetState = jest.spyOn(PixelList.prototype, "setState");
    const props = { image: null };
    const wrapper = shallow(
      <PixelList {...props} />
    );
    
    wrapper.instance()
      .componentWillReceiveProps(props);
    
    expect(spySetState).not.toHaveBeenCalled();
  });
  
  test("should calls setState", () => {
    const spySetState = jest.spyOn(PixelList.prototype, "setState");
    const spyGetCanvas = jest.spyOn(PixelList, "getCanvas").mockReturnValue();
    const spyGetFont = jest.spyOn(PixelList, "getFont").mockReturnValue();
    
    const props = { image: new Image() };
    const wrapper = shallow(
      <PixelList {...props} />
    );
    
    wrapper.instance()
      .componentWillReceiveProps(props);
    
    expect(spySetState).toHaveBeenCalledWith({
      canvas: undefined,
      font: undefined
    });
  });
});

describe("componentDidUpdate", () => {
  beforeEach(() => {    
    jest.spyOn(PixelList.prototype, "render")
      .mockReturnValue();
  });
  
  test("should calls props.setSvgData", () => {
    const props = { setSvgData: jest.fn() };
    const wrapper = shallow(
      <PixelList {...props} />
    );

    const instance = wrapper.instance();
    const data = "<svg " +
      "xmlns=\"http://www.w3.org/2000/svg\" " + 
      "xmlns:xlink=\"http://www.w3.org/1999/xlink\">" + 
      "<text>Hello</text>" +
      "</svg>";
    
    instance.svgNode = {
      outerHTML: "<svg><text>Hello</text></svg>"
    };
    
    instance.componentDidUpdate();
    
    expect(props.setSvgData).toHaveBeenCalledWith(
      new Blob([data], {
        type: "image/svg+xml;charset=utf-8"
      })
    );
  });
});

