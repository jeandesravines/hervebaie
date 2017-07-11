import React, { Component } from "react";
import { connect } from "react-redux";
import { setImage } from "../actions/image";

/**
 * @const {Object.<string, Function>}
 */
const mapDispatchToProps = {
  setImage
};

type Props = {
  setImage: (HTMLImageElement) => Object
};

export class ImageLoader extends Component<void, Props> {
  /**
   * @const {Object}
   */
  props: Props;

  /**
   * @param {Event} e
   */
  onChange (e: Object) {
    const file = e.target.files[0];
    const image = new Image();

    image.addEventListener("load", () => {
      this.props.setImage(image);
    });

    image.alt = file.name.replace(/\..+$/, "");
    image.src = URL.createObjectURL(file);
  }

  /**
   * @return {boolean}
   */
  shouldComponentUpdate(): boolean {
    return false;
  }

  /**
   * @inheritDoc
   */
  render() {
    const onChange = (e) => this.onChange(e);

    return (
      <input
        accept="image/*"
        onChange={onChange}
        type="file" />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ImageLoader);
