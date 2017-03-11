import { auth } from 'firebase';

/**
 * @const {string}
 */
export const LOGIN_SIGNIN = 'LOGIN_SIGNIN';

/**
 * @param {string} email
 * @param {string} password
 * @return {{
 *   type: string,
 *   payload: Promise.<firebase.User>
 * }}
 */
export const signIn = (email, password) => {
  const deferred = auth().signInWithEmailAndPassword(email, password);

  return {
    type: LOGIN_SIGNIN,
    payload: deferred,
  };
};
