import { AUTH_SIGNIN } from '../actions/authentication';

/**
 * @const {{
 *   user: Object?
 * }}
 */
const defaultState = {
  user: null,
};

/**
 * @param {Object} [state]
 * @param {Object} action
 * @param {string} action.type
 * @param {Object} action.payload
 * @return {Object}
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      return {...state, user: action.payload.data};
    default:
      return state;
  }
};
