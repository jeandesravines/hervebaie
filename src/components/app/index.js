import React, { Component } from 'react';
import { initializeApp } from 'firebase';
import configuration from '../../configuration/configuration';
import './style.scss';

export default class App extends Component {
  /**
   * @constructor
   */
  constructor() {
    super();
    
    firebase.initializeApp(configuration.firebase);
  }
  
  /**
   * @return {JSX}
   */
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }

  /**
   * @const {Object}
   */
  static propTypes = {
    children: React.PropTypes.element.isRequired,
  };
}
