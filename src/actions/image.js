/**
 * @const {string}
 */
export const IMAGE_SET = "IMAGE_SET";

/**
 * @param {Image} image
 * @return {{
 *   type: string,
 *   payload: Image
 * }}
 */
export const setImage = image => {
  return {
    type: IMAGE_SET,
    payload: image
  };
};
