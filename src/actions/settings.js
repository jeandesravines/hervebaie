/**
 * @const {string}
 */
export const SETTINGS_SET_ALL = 'SETTINGS_SET_ALL';

/**
 * @const {string}
 */
export const SETTINGS_SET = 'SETTINGS_SET';

/**
 * @param {settings} Object
 * @return {{
 *   type: string,
 *   payload: Object
 * }}
 */
export const setAll = (settings) => {
  return {
    type: SETTINGS_SET_ALL,
    payload: settings,
  };
};

export const setValue = (key, value) => {
  return {
    type: SETTINGS_SET,
    payload: {
      [key]: value,
    },
  };
};
