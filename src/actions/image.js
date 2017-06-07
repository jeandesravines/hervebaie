/**
 * @const {string}
 */
export const IMAGE_SET = "IMAGE_SET";

/**
 * @param {HTMLImageElement} image
 * @return {{
 *   type: string,
 *   payload: Image
 * }}
 */
export const setImage = (image: HTMLImageElement) => ({
  type: IMAGE_SET,
  payload: image
});
