import React from "react";
import { shallow, mount } from "enzyme";
import Sandbox from "@jdes/jest-sandbox";
import createStore from "../utils/store";
import RgbPixel from "../../lib/components/RgbPixel";
import Pixel from "../../lib/components/Pixel";
import BackgroundColor from "../../lib/components/BackgroundColor";
import BackgroundImage from "../../lib/components/BackgroundImage";
import ConnectedPixelList, { PixelList } from "../../lib/components/PixelList";

const sandbox = new Sandbox();

beforeEach(() => {
  sandbox.spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue({
      drawImage: jest.fn()
    });
});

afterEach(() => {
  sandbox.restoreAllMocks();
});

describe("getFont", () => {
  test("returns the associated font", () => {
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
      },
      setSvgData: jest.fn()
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
  test("returns a canvas for a portrait picture", () => {
    const font = PixelList.getCanvas({
      image: new Image(600, 800),
      setSvgData: jest.fn(),
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

  test("returns a canvas for a landscape picture", () => {
    const font = PixelList.getCanvas({
      image: new Image(800, 600),
      setSvgData: jest.fn(),
      settings: {
        maxSize: 1080
      }
    });

    expect(font).toMatchObject(
      expect.objectContaining({
        height: 1080,
        width: 810
      })
    );
  });
});

describe("getBackgroundColor", () => {
  test("returns a BackgroundColor", () => {
    const props = {
      setSvgData: jest.fn(),
      settings: {
        backgroundColorAlpha: 0.5,
        backgroundColor: "#FF0000"
      }
    };

    const backgroundColor = PixelList.getBackgroundColor(props);

    expect(backgroundColor).toMatchObject(
        <BackgroundColor color="#FF0000" opacity={0.5} />
    );
  });
});

describe("getBackgroundImage", () => {
  test("returns a BackgroundImage", () => {
    const props = {
      setSvgData: jest.fn(),
      settings: { backgroundImageAlpha: 0.5 }
    };

    const state = { canvas: document.createElement('canvas') };
    const backgroundImage = PixelList.getBackgroundImage(props, state);

    expect(backgroundImage).toMatchObject(
        <BackgroundImage canvas={{}} opacity={0.5} />
    );
  });
});

describe("getPixels", () => {
  test("returns a array of Pixel", () => {
    const props = {
      setSvgData: jest.fn(),
      settings: { rgb: false }
    };

    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 60;

    jest.spyOn(canvas, "getContext")
      .mockReturnValue({
        getImageData: () => ({
          data: [ 255, 255, 255, 255 ]
        })
      });

    const state = {
      canvas,
      font: { width: 4.8, height: 6.4 }
    };

    const pixels = PixelList.getPixels(props, state)
      .reverse();

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 6; x++) {
        const index = x + y * (1 + 5);
        const pixel = pixels[index];

        expect(pixel.type).toBe(Pixel);
        expect(pixel.props).toMatchObject({
          x,
          y,
          font: { width: 4.8, height: 6.4 },
          data: [ 255, 255, 255, 255 ]
        });
      }
    }
  });

  test("returns a array of RgbPixel", () => {
    const props = {
      setSvgData: jest.fn(),
      settings: { rgb: true, contrast: 0.5 }
    };

    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 60;

    jest.spyOn(canvas, "getContext")
      .mockReturnValue({
        getImageData: () => ({
          data: [ 255, 255, 255, 255 ]
        })
      });

    const state = {
      canvas,
      font: { width: 4.8, height: 6.4 }
    };

    const pixels = PixelList.getPixels(props, state)
      .reverse();

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 6; x++) {
        const index = x + y * (1 + 5);
        const pixel = pixels[index];

        expect(pixel.type).toBe(RgbPixel);
        expect(pixel.props).toMatchObject({
          x,
          y,
          font: { width: 4.8, height: 6.4 },
          contrast: 0.5,
          data: [ 255, 255, 255, 255 ]
        });
      }
    }
  });
});

describe("shouldComponentUpdate", () => {
  beforeEach(() => {
    sandbox.spyOn(PixelList.prototype, "render")
      .mockReturnValue();
  });

  test("should returns false", () => {
    const props = {
      image: null,
      setSvgData: jest.fn(),
      settings: {}
    };

    const wrapper = shallow(
        <PixelList {...props} />
    );

    const shouldComponentUpdate = wrapper
      .instance()
      .shouldComponentUpdate(props);

    expect(shouldComponentUpdate).toBe(false);
  });

  test("should returns true", () => {
    const props = {
      image: new Image(),
      setSvgData: jest.fn(),
      settings: {}
    };

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
    sandbox.spyOn(PixelList.prototype, "render")
      .mockReturnValue();

    sandbox.spyOn(PixelList.prototype, "componentDidMount")
      .mockReturnValue();
  });

  test("should do nothing - no props.image", () => {
    const spySetState = jest.spyOn(PixelList.prototype, "setState");
    const props = {
      image: null,
      setSvgData: jest.fn(),
      settings: {}
    };

    const wrapper = shallow(
        <PixelList {...props} />
    );

    wrapper.instance()
      .componentWillReceiveProps(props);

    expect(spySetState).not.toHaveBeenCalled();
  });

  test("should calls setState", () => {
    const spySetState = sandbox
      .spyOn(PixelList.prototype, "setState")
      .mockReturnValue();

    sandbox.spyOn(PixelList, "getCanvas")
      .mockReturnValue();

    sandbox.spyOn(PixelList, "getFont")
      .mockReturnValue();

    const props = {
      image: new Image(),
      setSvgData: jest.fn(),
      settings: {}
    };

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
    sandbox.spyOn(PixelList.prototype, "render")
      .mockReturnValue(null);
  });

  test("should calls props.setSvgData", () => {
    const props = {
      image: null,
      setSvgData: jest.fn(),
      settings: {}
    };

    const wrapper = shallow(
        <PixelList {...props} />
    );

    const instance = wrapper.instance();
    const data = (
      "<svg " +
      "xmlns=\"http://www.w3.org/2000/svg\" " +
      "xmlns:xlink=\"http://www.w3.org/1999/xlink\">" +
      "<text>Hello</text>" +
      "</svg>"
    );

    instance.nodeRef = {
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

describe("render", () => {
  beforeEach(() => {
    sandbox
      .spyOn(PixelList.prototype, "componentDidUpdate")
      .mockReturnValue();

    sandbox
      .spyOn(PixelList, "getFont")
      .mockReturnValue({
        dx: -1,
        dy: -1,
        fontFamily: "Arial,monospace",
        height: 6.4,
        width: 4.8
      });

    sandbox
      .spyOn(PixelList, "getCanvas")
      .mockImplementation(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 80;
        canvas.height = 60;

        jest.spyOn(canvas, "getContext")
          .mockReturnValue({
            getImageData: () => ({
              data: [ 255, 255, 255, 255 ]
            })
          });

        jest.spyOn(canvas, "toDataURL")
          .mockReturnValue("");

        return canvas;
      });
  });

  test("renders connected component", () => {
    const store = createStore({
      settings: {}
    });

    mount(<ConnectedPixelList store={store} />);
  });

  test("renders without crashing", () => {
    const props = {
      image: new Image(80, 60),
      setSvgData: jest.fn(),
      settings: {
        backgroundColor: "#FF0000",
        backgroundColorAlpha: 0.3,
        backgroundImageAlpha: 0.5,
        contrast: 0.5,
        fontSize: 20
      }
    };

    const wrapper = mount(
        <PixelList {...props} />
    );

    wrapper.update();

    expect(wrapper.find("svg").props()).toMatchObject({
      fontFamily: "Arial,monospace",
      fontSize: 20,
      width: 80,
      height: 60,
      preserveAspectRatio: "none",
      viewBox: "0 0 80 85"
    });

    expect(wrapper.find("BackgroundImage").props()).toMatchObject({
      opacity: 0.5,
      canvas: expect.objectContaining({
        width: 80,
        height: 60
      })
    });

    expect(wrapper.find("BackgroundColor").props()).toMatchObject({
      opacity: 0.3,
      color: "#FF0000"
    });

    expect(wrapper.find("Pixel")).toHaveLength(30);
  });

  test("returns null - no props.image", () => {
    const props = {
      image: null,
      setSvgData: jest.fn(),
      settings: {}
    };

    const wrapper = shallow(<PixelList {...props} />);

    expect(wrapper.getNode()).toBe(null);
  });
});
