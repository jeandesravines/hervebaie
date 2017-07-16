import { SETTINGS_SET } from "../actions/settings";

/**
 * @const {Object}
 */
const _state = {
  backgroundImageAlpha: 0.05,
  backgroundColor: "#FFFFFF",
  backgroundColorAlpha: 0.0,
  fontName: "Arial",
  fontSize: 20,
  liveReload: false,
  maxSize: 800,
  rgb: false,
  contrast: 0.4
};

/**
 * @param {Object} [state]
 * @param {Object} action
 * @param {string} action.type
 * @param {*} action.payload
 * @return {Object}
 */
export default (state = _state, action): Object => {
  switch (action.type) {
  case SETTINGS_SET:
    return {...state, ...action.payload};
  default:
    return state;
  }
};
