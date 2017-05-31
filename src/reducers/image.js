import { IMAGE_SET } from "../actions/image";

/**
 * @const Image?
 */
const _state: ?Image = null;

/**
 * @param {Object} [state]
 * @param {Object} action
 * @param {string} action.type
 * @param {*} action.payload
 * @return {Object}
 */
export default (state = _state, action): ?Image => {
  switch (action.type) {
    case IMAGE_SET:
      return action.payload.cloneNode();
    default:
      return state;
  }
};
