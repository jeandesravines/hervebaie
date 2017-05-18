import React from "react";
import { shallow, mount } from "enzyme";

import Font from "../../src/components/Font";

beforeAll(() => {
  HTMLUnknownElement.prototype.getBBox = () => {
    return { x: -5, y: -5, width: 800, height: 600 };
  };
});

afterAll(() => {
  delete HTMLUnknownElement.prototype.getBBox;
});

describe("component", () => {
  test("should have a prefered size", () => {
    expect(Font.fontSize).toBeGreaterThan(0);
  });
})

describe("render", () => {
  test("renders without crashing", () => {
    const props = {
      family: "Arial",
      onLoad: jest.fn()
    };

    mount(
      <Font {...props} />
    );
  });

  test("should be a text", () => {
    const props = {
      family: "Arial",
      onLoad: jest.fn()
    };

    const wrapper = shallow(
      <Font {...props} />
    );

    expect(wrapper.name()).toBe('text');
  });
  
  test("text node should have props", () => {
    const props = {
      family: "Arial",
      onLoad: jest.fn()
    };

    const wrapper = shallow(
      <Font {...props} />
    );

    expect(wrapper.find("text").props()).toMatchObject({
      fontFamily: "Arial",
      fontSize: Font.fontSize,
      alignmentBaseline: "hanging",
      dominantBaseline: "bottom"
    });
  });
  
  test("should contains '0'", () => {
    const props = {
      family: "Arial",
      onLoad: jest.fn()
    };

    const wrapper = shallow(
      <Font {...props} />
    );

    expect(wrapper.text()).toBe('0');
  });
});

describe("shouldComponentUpdate", () => {
  test("should returns false", () => {
    const props = {
      family: "Arial",
      onLoad: jest.fn()
    };

    const wrapper = shallow(
      <Font {...props} />
    );
    
    const shouldComponentUpdate = wrapper
      .instance()
      .shouldComponentUpdate();

    expect(shouldComponentUpdate).toBe(false);
  });
});

describe("getBBox", () => {
  it("returns a simulated SVGRect", () => {
    const props = {
      family: "Arial",
      onLoad: jest.fn()
    };

    const wrapper = mount(
      <Font {...props} />
    );

    const instance = wrapper.instance();

    expect(instance.getBBox()).toMatchObject({
      x: -5, y: -5, width: 800, height: 600
    });
  });
});

describe("componentDidMount", () => {
  test("should call onLoad prop", (done) => {
    const onLoad = (props) => {
      const coef = 1 / Font.fontSize;

      expect(props).toMatchObject({
        dx: 5 * coef,
        dy: 5 * coef,
        width: 800 * coef,
        height: (600 - 5 * 2) * coef,
      });

      done();
    };
    
    const props = {
      family: "Arial",
      onLoad
    };

    mount(
      <Font {...props} />
    );
  });
});