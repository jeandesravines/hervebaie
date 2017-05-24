import React from "react";
import { shallow, mount } from "enzyme";
import sandbox from "../utils/sandbox";
import Font from "../../src/components/Font";

beforeEach(() => {
  sandbox.spyOn(HTMLUnknownElement.prototype, "getBBox")
    .mockReturnValue({ x: -5, y: -5, width: 800, height: 600 });
});

describe.skip("component", () => {
  test("should have a prefered size", () => {
    expect(Font.fontSize).toBeGreaterThan(0);
  });
});

describe.skip("render", () => {
  test("renders without crashing", () => {
    const props = {
      family: "Arial",
      onLoad: jest.fn()
    };

    const wrapper = mount(
      <Font {...props} />
    );
    
    const expected = {
      fontFamily: "Arial",
      fontSize: Font.fontSize,
      alignmentBaseline: "hanging",
      dominantBaseline: "bottom",
      children: "0"
    };

    expect(wrapper.find("text").props()).toMatchObject(expected);
    expect(wrapper.instance().nodeRef.localName).toBe("text");
  });
});

describe("shouldComponentUpdate", () => {
  beforeEach(() => {
    sandbox.spyOn(Font.prototype, "componentDidMount").mockReturnValue(null);
    sandbox.spyOn(Font.prototype, "render").mockReturnValue(null);
  });

  test("should returns false", () => {
    const wrapper = shallow(<Font />);
    const shouldComponentUpdate = wrapper.instance().shouldComponentUpdate();

    expect(shouldComponentUpdate).toBe(false);
  });
});

describe("getBBox", () => {
  beforeEach(() => {
    sandbox.spyOn(Font.prototype, "componentDidMount").mockReturnValue(null);
    sandbox.spyOn(Font.prototype, "render").mockReturnValue(null);
  });

  it("returns a simulated SVGRect", () => {
    const wrapper = shallow(<Font/>)
    const instance = wrapper.instance();
    const bBox = { x: -5, y: -5, width: 800, height: 600 };

    instance.nodeRef = {
      getBBox: () => bBox
    };
    
    expect(instance.getBBox()).toBe(bBox);
  });
});

describe("componentDidMount", () => {
  test("should call onLoad prop", () => {
    const props = {
      family: "Arial",
      onLoad: jest.fn()
    };

    const wrapper = mount(
      <Font {...props} />
    );
    
    const coef = 1 / Font.fontSize;
    const expected = {
      dx: 5 * coef,
      dy: 5 * coef,
      width: 800 * coef,
      height: (600 - 5 * 2) * coef,
    };
    
    wrapper.instance().componentDidMount();
    expect(props.onLoad).toHaveBeenCalledWith(expected);
  });
});
