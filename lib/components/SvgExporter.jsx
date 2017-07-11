import React, { PureComponent } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import configuration from "../configuration/configuration";
import styles from "../assets/styles/components/SvgExporter.scss";

/**
 * @const {Function(Object): Object}
 */
const mapStateToProps = (state) => ({
  data: state.svgData,
  image: state.image
});

type Props = {
  data: Blob,
  image: Image
};

export class SvgExporter extends PureComponent<void, Props> {
  /**
   * @const {Object}
   */
  props: Props;

  /**
   * @inheritDoc
   */
  render() {
    const { data, image } = this.props;
    let props = {};

    if (data) {
      const prefix = configuration.exporter.prefix;
      const href = URL.createObjectURL(data);
      const title = `${prefix}${image.alt}.svg`;

      props = {
        href,
        title,
        download: title
      };
    }

    return (
      <RaisedButton {...props}
        className={styles.button}
        secondary={true}
        disabled={!data}
        label="Download as SVG" />
    );
  }
}

export default connect(
  mapStateToProps
)(SvgExporter);
