import React, { Component } from "react";
import { connect } from "react-redux";
import { setImage } from "../actions/image";

const mapDispatchToProps = {
  setImage
};

export class ImageLoader extends Component {
  props: {
    setImage: Function
  };

  shouldComponentUpdate() {
    return false;
  }

  onClick(e) {
    e.preventDefault();

    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", this.onChange.bind(this));
    input.click();
  }

  onChange(e: Event) {
    const file = e.target.files[0];
    const image = new Image();

    image.addEventListener("load", () => {
      this.props.setImage(image);
    });

    image.alt = file.name.replace(/\..+$/, "");
    image.src = URL.createObjectURL(file);
  }

  render() {
    return (
      <div>
        Select an image:
        <button type="button" onClick={e => this.onClick(e)}>
          Select
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ImageLoader);
