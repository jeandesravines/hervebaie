import { SETTINGS_SET, SETTINGS_SET_ALL } from '../actions/settings';

/**
 * @const {Object}
 */
const initialState = {
  backgroundAlpha: 0.0,
  backgroundColor: '#FFF',
  backgroundColorAlpha: 0.0,
  fontFamily: 'monospace',
  fontSize: 15,
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
    case SETTINGS_SET_ALL:
      return {...action.payload};
    case SETTINGS_SET:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
