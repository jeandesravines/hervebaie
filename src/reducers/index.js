import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../components/login-signin/reducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
});
