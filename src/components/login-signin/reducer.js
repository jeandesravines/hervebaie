import { LOGIN_SIGNIN } from './actions';

const _state = {
  user: null,
};

export default (state = _state, action) => {
  switch (action.type) {
    case LOGIN_SIGNIN: 
      return {...state, user: action.payload.data};
    default:
      return state;
  }
};
