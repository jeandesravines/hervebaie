import { SETTINGS_SET } from '../actions/settings';

/**
 * @const {Object}
 */
const initialState = {
  backgroundAlpha: 0.1,
  backgroundColor: '#FFFFFF',
  backgroundColorAlpha: 0.0,
  fontName: 'monospace',
  fontSize: 8,
  maxSize: 800,
};

/**
 * @param {Object} [state]
 * @param {Object} action
 * @param {string} action.type
 * @param {Object} action.payload
 * @return {Object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_SET:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
