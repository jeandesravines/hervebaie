import { IMAGE_SET } from '../actions/image';

/**
 * @const {{
 *   image: Image?
 * }}
 */
const defaultState = {
  image: null,
};

/**
 * @param {Object} [state]
 * @param {Object} action
 * @param {string} action.type
 * @param {Image} action.payload
 * @return {Object}
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case IMAGE_SET:
      return {...state, image: action.payload};
    default:
      return state;
  }
};
