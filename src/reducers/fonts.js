import _ from "lodash";
import configuration from '../configuration/configuration';
import { FONTS_SET } from "../actions/fonts";

const {
  fonts: {
    families
  }
} = configuration;

/**
 * @const {Array.<{
 *   family: string,
 *   name: string
 * }>}
 */
const fonts = _.map(families, name => ({
  family: `${name}, monospace`,
  name
}));

/**
 * @const {Object.<string, Object>}
 */
const _state = _.mapKeys(fonts, font => {
  return font.name;
});

/**
 * @param {Object} [state]
 * @param {Object} actionq
 * @param {string} action.type
 * @param {*} action.payload
 * @return {Object}
 */
export default (state = _state, action): Object => {
  switch (action.type) {
    case FONTS_SET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
