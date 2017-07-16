import React from "react";
import SettingsPanel from "./SettingsPanel";
import PixelList from "./PixelList";
import FontSizeCalculator from "./FontSizeCalculator";

/**
 * @return {*}
 */
export default function DrawScene() {
  return (
    <div>
      <div>
        <FontSizeCalculator/>
        <SettingsPanel/>
      </div>
      <div>
        <PixelList/>
      </div>
    </div>
  );
}
