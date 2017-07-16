import React from "react";
import { shallow } from "enzyme";
import DrawScene from "../../lib/components/DrawScene";
import PixelList from "../../lib/components/PixelList";
import SettingsPanel from "../../lib/components/SettingsPanel";

describe("render", () => {
  test("renders without crashin", () => {
    const wrapper = shallow(
      <DrawScene />
    );

    const components = [
      PixelList,
      SettingsPanel,
    ];

    components.forEach((component) => {
      expect(wrapper.find(component)).toHaveLength(1);
    });
  });
});
