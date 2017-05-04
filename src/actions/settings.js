/**
 * @const {string}
 */
export const SETTINGS_SET = "SETTINGS_SET";

export const setValue = (key, value) => {
  return {
    type: SETTINGS_SET,
    payload: {
      [key]: value
    }
  };
};

export const setSettings = settings => {
  return {
    type: SETTINGS_SET,
    payload: settings
  };
};
