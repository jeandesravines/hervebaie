import { IMAGE_SET } from "../actions/image";

/**
 * @const Image?
 */
const defaultState = null;

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
      return action.payload.cloneNode();
    default:
      return state;
  }
};
