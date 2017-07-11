/**
 * @const {string}
 */
export const SETTINGS_SET = "SETTINGS_SET";

/**
 * @param {string} key
 * @param {*} value
 * @return {Object.<string, *>}
 */
export const setValue = (key: string, value: any) => ({
  type: SETTINGS_SET,
  payload: {
    [key]: value
  }
});

/**
 * @param {Object.<string, *>} settings
 * @return {Object.<string, *>}
 */
export const setSettings = (settings: Object) => ({
  type: SETTINGS_SET,
  payload: settings
});
