import React, { Component } from 'react';

const fontSize = 200;

export default class Font extends Component {
  node = null;
  
  static propTypes = {
    onLoad: React.PropTypes.func.isRequired,
    font: React.PropTypes.shape({
      fontFamily: React.PropTypes.string.isRequired,
    }).isRequired,
  };
  
  render() {
    const font = this.props.font;
    const fontFamily = `${font.fontFamily}, monospace`;
    
    return (
      <svg>
        <text 
          ref={e => this.node = e}
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
      this.props.onLoad({
        ...this.props.font,
        coef: 1 / fontSize,
        dx: -x,
        dy: -y,
        height: height + y * 2,
        width: width + x * 2 * 0,
      });
    }
  }
}
