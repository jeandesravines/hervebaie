import _ from 'lodash';
import { FONTS_SET } from '../actions/fonts';

/**
 * @const {Array.<string>}
 */
const names = [
  'Arial',
  'Courrier',
  'Courrier new',
  'Helvetica',
  'monospace',
];

/**
 * @const {Array.<Object>}
 */
const fonts = _.map(names, (name) => ({
  fontFamily: name,
}));

/**
 * @const {Object.<string, Object>}
 */
const defaultState = _.mapKeys(fonts, (font) => {
  return font.fontFamily;
});

/**
 * @param {Object} [state]
 * @param {Object} actionq
 * @param {string} action.type
 * @param {Array} action.payload
 * @return {Object}
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case FONTS_SET:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
