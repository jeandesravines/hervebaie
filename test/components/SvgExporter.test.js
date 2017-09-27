import React from "react";
import { mount, shallow } from "enzyme";
import Sandbox from "@jdes/jest-sandbox";
import createStore from "redux-mock-store";
import ConnectedSvgExporter, { SvgExporter } from "../../lib/components/SvgExporter";

const sandbox = new Sandbox();
const mockStore = createStore([]);

beforeEach(() => {
  sandbox.spyOn(URL, "createObjectURL")
    .mockImplementation(data => data);
});

afterEach(() => {
  sandbox.restoreAllMocks();
});

describe("render", () => {
  test("renders without crashing", () => {
    const store = mockStore({
      data: "data:image/png;base64,",
      image: {
        alt: "Hello"
      }
    });

    const wrapper = mount(
      <ConnectedSvgExporter store={store}/>
    );

    expect(wrapper).toHaveLength(1);
  });

  test("returns disabled button", () => {
    const wrapper = shallow(
      <SvgExporter/>
    );

    expect(wrapper.props()).toMatchObject({
      className: undefined,
      children: "Download as SVG",
      disabled: true
    });
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
      className: undefined,
      disabled: false,
      download: "HerveBaie - Hello.svg",
      href: "data:image/png;base64,",
      children: "Download as SVG"
    });
  });
});
