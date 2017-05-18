import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  data: state.svgData,
  image: state.image
});

export class SvgExporter extends Component {
  props: {
    data: Blob,
    image: Image
  };
  
  render() {
    const { data, image } = this.props;
    
    if (!data) {
      return null;
    }
    
    const url = URL.createObjectURL(data);
    const title = `${image.alt}.svg`;
    
    return (
        <a 
          target="_blank"
          rel="noopener noreferrer"
          download={title}
          href={url}>Download as SVG</a>
    );
  }
}

export default connect(
  mapStateToProps
)(SvgExporter);
