import React from "react";

import SettingsPanel from "./SettingsPanel";
import PixelList from "./PixelList";
import ImageLoader from "./ImageLoader";
import SvgExporter from "./SvgExporter";
import FontSizeCalculator from "./FontSizeCalculator";

/**
 * @return {*}
 */
export default function DrawScene() {
  return (
    <div>
      <FontSizeCalculator />
      <ImageLoader />
      <SettingsPanel />
      <SvgExporter />
      <PixelList />
    </div>
  );
}
