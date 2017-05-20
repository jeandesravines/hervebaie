import React, { Component } from "react";
import { connect } from "react-redux";
import { setImage } from "../actions/image";
import styles from "../styles/ImageLoader";

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
   * @return {boolean}
   */
  shouldComponentUpdate(): boolean {
    return false;
  }

  /**
   * @param {Event} e
   */
  onChange (e: Event) {
    const file = e.target.files[0];
    const image = new Image();

    image.addEventListener("load", () => {
      this.props.setImage(image);
    });

    image.alt = file.name.replace(/\..+$/, "");
    image.src = URL.createObjectURL(file);
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div>
        <label htmlFor="hb-image-loader__input">
          Select an image
        </label>
        <input 
          style={styles.input}
          type="file" 
          accept="image/*" 
          id="hb-image-loader__input"
          className="hb-image-loader__input"
          onChange={e => this.onChange(e)} />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ImageLoader);
