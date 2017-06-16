import React from "react";
import { shallow } from "enzyme";
import DrawScene from "../../lib/components/DrawScene";
import FontSizeCalculator from "../../lib/components/FontSizeCalculator";
import ImageLoader from "../../lib/components/ImageLoader";
import PixelList from "../../lib/components/PixelList";
import SettingsPanel from "../../lib/components/SettingsPanel";
import SvgExporter from "../../lib/components/SvgExporter";

describe("render", () => {
  test("renders without crashin", () => {
    const wrapper = shallow(
        <DrawScene />
    );

    const components = [
      FontSizeCalculator,
      ImageLoader,
      PixelList,
      SettingsPanel,
      SvgExporter
    ];

    components.forEach((component) => {
      expect(wrapper.find(component)).toHaveLength(1);
    });
  });
});
