import React from "react";
import { mount, shallow } from 'enzyme';
import _ from "lodash";
import createStore from '../mock/store';

import ConnectedFontSizeCalculator, { FontSizeCalculator } from "../../src/components/FontSizeCalculator";

beforeAll(() => {
  HTMLUnknownElement.prototype.getBBox = () => {
    return { x: -5, y: -5, width: 800, height: 600 };
  };
});

afterAll(() => {
  delete HTMLUnknownElement.prototype.getBBox;
});

describe("render", () => {
  it("renders without crashing", () => {
    const store = createStore({
      fonts: {
        Arial: {family: "Arial"},
        Helvetica: {family: "Helvetica"}
      }
    });
    
    mount(
      <ConnectedFontSizeCalculator store={store} />
    );
  });
  
  test("should be a svg", () => {
    const wrapper = shallow(
      <FontSizeCalculator />
    );
    
    expect(wrapper.name()).toBe("svg");
  });
  
  test("should has class", () => {
    const wrapper = shallow(
      <FontSizeCalculator />
    );

    expect(wrapper.hasClass("hb-font-size-calculator")).toBe(true);
  });
  
  test("should contains Fonts", () => {
    const props = {
      fonts: {
        Arial: { family: "Arial, monospace" },
        Helvetica: { family: "Helvetica, monospace" }
      }
    };
    
    const wrapper = shallow(
      <FontSizeCalculator {...props} />
    );

    _.forEach(props.fonts, (font) => {
      expect(
        wrapper.find(`Font[family="${font.family}"]`)
      ).toHaveLength(1);
    });
  });
});

describe("shouldComponentUpdate", () => {
  test("should returns false", () => {
    const wrapper = shallow(
      <FontSizeCalculator />
    );
    
    const shouldComponentUpdate = wrapper
      .instance()
      .shouldComponentUpdate();

    expect(shouldComponentUpdate).toBe(false);
  });
});

describe("setFont", () => {
  
});
