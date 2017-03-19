import { auth } from 'firebase';

/**
 * @const {string}
 */
export const AUTH_SIGNIN = 'AUTH_SIGNIN';

/**
 * @param {string} email
 * @param {string} password
 * @return {{
 *   type: string,
 *   payload: Promise.<firebase.User>
 * }}
 */
export const signIn = (email, password) => {
  return {
    type: AUTH_SIGNIN,
    payload: auth()
      .signInWithEmailAndPassword(email, password),
  };
};
