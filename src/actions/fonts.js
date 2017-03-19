export const FONTS_SET = 'FONTS_SET';

/**
 * @param {string} key
 * @param {Object} font
 * @return {{
 *   type: string,
 *   payload: Object
 * }}
 */
export const setFont = (key, font) => {
  return {
    type: FONTS_SET,
    payload: {
      [key]: font,
    },
  };
};