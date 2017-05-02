import React, { Component } from 'react';

const fontSize = 200;

export default class Font extends Component {
  node: ?HTMLEement;
  props: {
    onLoad: Function,
    font: {
      fontFamily: string
    }
  };
  
  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    const font = this.props.font;
    const fontFamily = `${font.fontFamily}, monospace`;
    
    return (
      <svg>
        <text 
          ref={n => this.node = n}
          fontFamily={fontFamily}
          alignmentBaseline="hanging"
          dominantBaseline="bottom"
          fontSize={fontSize}>0</text>
      </svg>
    );
  }
  
  componentDidMount() {
    const { height, width, x, y } = this.node.getBBox();

    if (height && width) {
      const coef = 1 / fontSize;
      const fontHeight = height + y * 2;
      const fontWidth = width + x * 2 * 0;
      
      this.props.onLoad({
        ...this.props.font,
        coef,
        dx: -x * coef,
        dy: -y * coef,
        ratio: fontWidth / fontHeight,
        height: fontHeight * coef,
        width: fontWidth * coef
      });
    }
  }
}
