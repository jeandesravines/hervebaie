import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Button from "material-ui/Button";
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
      <Button {...props}
        raised
        className={styles.button}
        color="accent"
        disabled={!data}>
        Download as SVG
      </Button>
    );
  }
}

export default connect(
  mapStateToProps
)(SvgExporter);
