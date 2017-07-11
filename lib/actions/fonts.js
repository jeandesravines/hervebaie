/**
 * @const {string}
 */
export const FONTS_SET = "FONTS_SET";

/**
 * @param {string} key
 * @param {Object} font
 * @return {{
 *   type: string,
 *   payload: Object.<string, Object>
 * }}
 */
export const setFont = (key: string, font: Object) => ({
  type: FONTS_SET,
  payload: {
    [key]: font
  }
});
