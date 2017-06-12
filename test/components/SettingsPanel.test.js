import React from "react";
import { mount, shallow } from "enzyme";
import createStore from "../utils/store";
import sandbox from "../utils/sandbox";

import ConnectedSettingsPanel, { SettingsPanel } from "../../src/components/SettingsPanel";

describe("componentWillReceiveProps", () => {
  it("should set state", () => {
    const spySetState = sandbox
      .spyOn(SettingsPanel.prototype, "setState");

    const props = {
      fonts: {},
      setSettings: jest.fn(),
      settings: {
        contrast: 0.5
      }
    };

    const wrapper = shallow(
        <SettingsPanel {...props} />
    );

    wrapper.instance()
      .componentWillReceiveProps(props);

    expect(spySetState).toHaveBeenCalledWith({
      settings: props.settings
    });
  });
});

describe("onApplySettings", () => {
  test("should calls setSettings", () => {
    const props = {
      fonts: {},
      setSettings: jest.fn(),
      settings: {
        contrast: 0.5
      }
    };

    const event = { preventDefault: jest.fn() };
    const wrapper = shallow(
        <SettingsPanel {...props} />
    );

    wrapper.instance()
      .onApplySettings(event);

    expect(props.setSettings).toHaveBeenCalledWith({
      contrast: 0.5
    });
  });
});

describe("setValue", () => {
  test("should calls setState", () => {
    const spySetState = sandbox
      .spyOn(SettingsPanel.prototype, "setState");

    const props = {
      fonts: {},
      setSettings: jest.fn(),
      settings: {
        contrast: 0.5
      }
    };

    const wrapper = shallow(
        <SettingsPanel {...props} />
    );

    wrapper.instance()
      .setValue("fontName", "Arial");

    expect(spySetState).toHaveBeenCalledWith({
      settings: {
        contrast: 0.5,
        fontName: "Arial"
      }
    });
  });

  test("should calls setSettings", () => {
    const props = {
      fonts: {},
      setSettings: jest.fn(),
      settings: {
        contrast: 0.5,
        liveReload: true
      }
    };

    const wrapper = shallow(
        <SettingsPanel {...props} />
    );

    wrapper.instance()
      .setValue("fontName", "Arial");

    expect(props.setSettings).toHaveBeenCalledWith({
      fontName: "Arial"
    });
  });
});

describe("render", () => {
  test("renders without crashing", () => {
    const store = createStore({
      fonts: {
        Arial: { family: "Arial,monospace" },
        Helvetica: { family: "Helvetica,monospace" }
      },
      setSettings: jest.fn(),
      settings: {
        backgroundImageAlpha: 0.7,
        backgroundColor: "#FF0000",
        backgroundColorAlpha: 0.5,
        contrast: 0.7,
        fontName: "Arial",
        fontSize: 22,
        liveReload: true,
        maxSize: 1080,
        rgb: true
      }
    });

    const wrapper = mount(
        <ConnectedSettingsPanel store={store} />
    );
  });
});
