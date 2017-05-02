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
  state: {
    fonts: Object
  };
  
  componentShouldUpdate(nextProps) {
    return this.state.fonts === undefined
  } 
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      fonts: {...this.props.fonts}
    });
  }
  
  render() {
    const fonts = _.map(this.fonts, (font, key) => (
      <Font key={key} 
        font={font}
        onLoad={(font) => this.fontDidLoad(key, font)} />
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
  
  fontDidLoad(key, font) {
    this.props.setFont(key, font);
    delete this.fonts[key];
  } 
}