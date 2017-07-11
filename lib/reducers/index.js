import { combineReducers } from "redux";
import fonts from "./fonts";
import image from "./image";
import settings from "./settings";
import svgData from "./svg-data";

/**
 * @const {function(): Object}
 */
export default combineReducers({
  fonts,
  image,
  settings,
  svgData
});
