import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Font from './Font';
import { setFont } from '../actions/fonts';

const mapStateToProps = (state) => ({
  fonts: state.fonts,
});

@connect(mapStateToProps, { setFont })
export default class FontsContainer extends Component {
  render() {
    const fonts = _.map(this.props.fonts, (font, key) => (
      <Font key={key} 
        font={font}
        onLoad={(props) => this.props.setFont(key, props)} />
    ));
    
    const style = {
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      width: 0,
      height: 0,
    };
    
    return (
      <svg style={style}>{fonts}</svg>
    );
  }
}