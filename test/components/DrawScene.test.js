import React from "react";
import { shallow } from "enzyme";

import DrawScene from "../../src/components/DrawScene";
import FontSizeCalculator from "../../src/components/FontSizeCalculator";
import ImageLoader from "../../src/components/ImageLoader";
import PixelList from "../../src/components/PixelList";
import SettingsPanel from "../../src/components/SettingsPanel";
import SvgExporter from "../../src/components/SvgExporter";

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
