import React from "react";
import { mount, shallow } from 'enzyme';
import Sandbox from "@jdes/jest-sandbox";
import createStore from '../utils/store';
import ConnectedSvgExporter, { SvgExporter } from "../../lib/components/SvgExporter";

const sandbox = new Sandbox();

beforeEach(() => {
  sandbox.spyOn(URL, "createObjectURL")
    .mockImplementation(data => data);
});

afterEach(() => {
  sandbox.restoreAllMocks();
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
      download: "HerveBaie - Hello.svg",
      rel: "noopener noreferrer",
      href: "data:image/png;base64,",
      children: "Download as SVG"
    });
  });
});
