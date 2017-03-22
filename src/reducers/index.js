import { combineReducers } from 'redux';
import fonts from './fonts';
import image from './image';
import settings from './settings';

/**
 * @const {function(): Object}
 */
export default combineReducers({
  fonts,
  image,
  settings,
});
