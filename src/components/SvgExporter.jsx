import React, { Component } from 'react';
import { connect } from 'react-redux';
import configuration from '../configuration/configuration';

/**
 * @const {Function(Object): Object}
 */
const mapStateToProps = (state) => ({
  data: state.svgData,
  image: state.image
});

type Props = {
  +data: Blob,
  +image: Image
};

export class SvgExporter extends Component<void, Props> {
  /**
   * @const {Object}
   */
  props: Props;

  /**
   * @inheritDoc
   */
  render() {
    const { data, image } = this.props;
    
    if (!data) {
      return null;
    }
    
    const prefix = configuration.exporter.prefix;
    const url = URL.createObjectURL(data);
    const title = `${prefix}${image.alt}.svg`;
    
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
