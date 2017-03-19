import React, { Component } from 'react';

export default class Font extends Component {
  node = null;
  
  render() {
    return (
      <text 
        ref={node => this.node = node}
        fontFamily={this.props.font.fontFamily}
        alignmentBaseline="hanging"
        fontSize={10}>0</text>
    );
  }
  
  componentDidMount() {
    const bBox = this.node.getBBox();
    const { width, height, x, y } = bBox;

    if (width && height) {
      this.props.onLoad({
        ...this.props.font,
        width: Math.floor(width + x * 2),
        height: Math.floor(height + y * 2),
        dx: -x,
        dy: -y,
      });
    }
  }
  
  static propTypes = {
    font: React.PropTypes.object.isRequired,
    onLoad: React.PropTypes.func.isRequired,
  };
}
