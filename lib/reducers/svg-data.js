import { DATA_SET } from "../actions/svg-data";

/**
 * @const {Blob?}
 */
const _state: ?Blob = null;

/**
 * @param {Object} [state]
 * @param {Object} action
 * @param {string} action.type
 * @param {*} action.payload
 * @return {Object}
 */
export default (state = _state, action): ?Blob => {
  switch (action.type) {
  case DATA_SET:
    return action.payload.slice();
  default:
    return state;
  }
};
