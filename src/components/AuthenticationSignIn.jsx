import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/authentication';

/**
 * @const {function(state: Object): Object}
 */
const mapStateToProps = (state) => ({
  user: state.user,
});

/**
 * @class
 * @extends Components
 */
@connect(mapStateToProps, actions)
export default class AuthenticationSignIn extends Component {
  /**
   * @param {Event} event
   * @private
   */
  onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const {
      email,
      password,
    } = form.elements;

    this.props.signIn(email.value, password.value)
      .then((action) => {
        if (action.error) {
          form.password.value = '';
          console.error(action.payload);
        }
      });
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email" />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            type="password" />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
      </form>
    );
  }

  /**
   * @const {Object}
   * @static
   */
  static propsTypes = {
    user: PropTypes.object,
    signIn: PropTypes.func.isRequired,
  };
}
