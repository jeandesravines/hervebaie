import React, { Component } from 'react';

export default class Font extends Component {
  node = null;
  
  render() {
    return (
      <text 
        ref={e => this.node = e}
        fontFamily={this.props.font.fontFamily}
        alignmentBaseline="hanging"
        fontSize={10}>0</text>
    );
  }
  
  componentDidMount() {
    const bbox = this.node.getBBox();
    const { width, height, x, y } = bbox;

    if (width && height) {      
      this.props.onLoad({
        ...this.props.font,
        width: width + x * 2,
        height: height + y * 2,
        dx: -x,
        dy: -y,
      });
    }
  }
  
  static propTypes = {
    onLoad: React.PropTypes.func.isRequired,
    font: React.PropTypes.shape({
      fontFamily: React.PropTypes.string.isRequired,
    }).isRequired,
  };
}
