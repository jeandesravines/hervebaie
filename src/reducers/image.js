import { IMAGE_SET } from "../actions/image";

/**
 * @const Image?
 */
const _state: ?HTMLImageElement = null;

/**
 * @param {Object} [state]
 * @param {Object} action
 * @param {string} action.type
 * @param {?HTMLImageElement} action.payload
 * @return {Object}
 */
export default (state = _state, action): ?HTMLImageElement => {
  switch (action.type) {
    case IMAGE_SET:
      return action.payload.cloneNode();
    default:
      return state;
  }
};
