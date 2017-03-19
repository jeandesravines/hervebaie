import { combineReducers } from 'redux';
import authentication from './authentication';
import fonts from './fonts';
import image from './image';
import settings from './settings';

/**
 * @const {function(): Object}
 */
export default combineReducers({
  authentication,
  fonts,
  image,
  settings,
});
