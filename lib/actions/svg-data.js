/**
 * @const {string}
 */
export const DATA_SET = "DATA_SET";

/**
 * @param {Blob} data
 * @return {{
 *   type: string,
 *   payload: Blob
 * }}
 */
export const setSvgData = (data: Blob) => ({
  type: DATA_SET,
  payload: data
});
