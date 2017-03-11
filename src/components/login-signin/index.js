import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { signIn } from './actions';

/**
 * @const {Object.<string, Object>}
 */
const inputs = {
  email: {
    type: 'email',
    label: 'Email',
  },
  password: {
    type: 'password',
    label: 'Password',
  },
};

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
@connect(mapStateToProps, { signIn })
export default class LoginIndex extends Component {
  onSubmit(event) {
    const {
      email,
      password,
    } = _.mapValues()
  }
  
  /**
   * @param {Object.<string, Object>} inputs
   * @return {Object}
   * @private
   */
  renderInputs(inputs) {
    return _.mapValues(inputs, ({type, label}, name) => {
      return (
        <label key={name}>
          {label}: <input type={type} name={name} required />
        </label>
      );
    });
  }
  
  /**
   * @return {Object}
   */
  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        {this.renderInputs(inputs)}
        
        <hr/>
        <input type="submit" />
      </form>
    );
  }

  /**
   * @return {Object}
   * @static
   */
  static get propsTypes() {
    return {
      user: PropTypes.object,
    };
  }
}
