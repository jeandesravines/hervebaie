import { FONTS_SET } from "../actions/fonts";

const fonts = [
  "Andale Mono",
  "Arial",
  "Courrier New",
  "Helvetica",
  "Lucida Console",
  "Lucida Sans Typewriter",
  "monospace"
];

/**
 * @const {Object.<string, Object>}
 */
const _state = fonts.reduce((state, name) => ({
  ...state,
  [name]: {
    family: `${name},monospace`
  }
}), {});

/**
 * @param {Object} [state]
 * @param {Object} action
 * @param {string} action.type
 * @param {*} action.payload
 * @return {Object}
 */
export default (state = _state, action: Object): Object => {
  switch (action.type) {
    case FONTS_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
