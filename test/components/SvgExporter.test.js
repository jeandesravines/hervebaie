import React from "react";
import { mount, shallow } from "enzyme";
import Sandbox from "@jdes/jest-sandbox";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import createStore from "../utils/store";
import ConnectedSvgExporter, { SvgExporter } from "../../lib/components/SvgExporter";

const sandbox = new Sandbox();

beforeAll(() => {
  injectTapEventPlugin();
});

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
      <MuiThemeProvider>
        <ConnectedSvgExporter store={store} />
      </MuiThemeProvider>
    );

    expect(wrapper).toHaveLength(1);
  });

  test("returns disabled button", () => {
    const wrapper = shallow(
      <SvgExporter />
    );

    expect(wrapper.props()).toMatchObject({
      className: undefined,
      label: "Download as SVG",
      disabled: true,
      secondary: true,
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
      secondary: true,
      href: "data:image/png;base64,",
      label: "Download as SVG"
    });
  });
});
