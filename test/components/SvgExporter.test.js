import React from "react";
import { mount, shallow } from 'enzyme';
import createStore from '../mock/store';

import ConnectedSvgExporter, { SvgExporter } from "../../src/components/SvgExporter";

beforeAll(() => {
  if (!URL.createObjectURL) {
    URL.createObjectURL = jest.fn((data) => data);
  }
});

afterAll(() => {
  if (jest.isMockFunction(URL.createObjectURL)) {
    delete URL.createObjectURL;
  }
});

describe("render", () => {
  test("renders without crashing", () => {
    const store = createStore({
      data: "data:image/png;base64,",
      image: {
        alt: "Hello"
      }
    });

    const wrapper = mount(
      <ConnectedSvgExporter store={store} />
    );
    
    expect(wrapper).toHaveLength(1);
  });
  
  test("returns null", () => {
    const wrapper = shallow(
      <SvgExporter />
    );

    expect(wrapper.getNode()).toBe(null);
  });
  
  test("have props", () => {
    const props = {
      data: "data:image/png;base64,",
      image: {
        alt: "Hello"
      }
    };

    const wrapper = shallow(
      <SvgExporter {...props} />
    );

    expect(wrapper.props()).toMatchObject({
      target: "_blank",
      download: "Hello.svg",
      rel: "noopener noreferrer",
      href: "data:image/png;base64,"
    });
  });
});
