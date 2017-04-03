import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/image';

@connect(null, actions)
export default class ImageLoader extends Component {
  onClick(e) {
    e.preventDefault();
    
    const input = document.createElement('input');
    
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', this.onChange.bind(this));
    input.click();
  }
  
  onChange(e) {
    const file = e.target.files[0];
    const image = new Image();
    
    image.addEventListener('load', (e) => {
      this.props.setImage(e.target);
    });
    
    image.src = URL.createObjectURL(e.target.files[0]);
  }
  
  render() {
    return (
      <div>
        FileInput: 
        
        <button onClick={this.onClick.bind(this)}>
          Select
        </button>
      </div>
    );
  }
}