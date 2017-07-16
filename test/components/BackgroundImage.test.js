import React from "react";
import { mount, shallow } from "enzyme";
import BackgroundImage from "../../lib/components/BackgroundImage";

describe("render", () => {
  test("renders without crashing", () => {
    const props = {
      opacity: 0.5,
      canvas: document.createElement("canvas")
    };

    const wrapper = mount(
      <BackgroundImage {...props} />
    );

    expect(wrapper.getNode()).not.toBe(null);
    expect(wrapper.find("image").props()).toMatchObject({
      href: props.canvas.toDataURL(),
      opacity: 0.5,
      preserveAspectRatio: "none",
      width: "100%",
      height: "100%"
    });
  });

  test("should returns null", () => {
    const props = {
      opacity: 0,
      canvas: document.createElement("canvas")
    };

    const wrapper = shallow(
      <BackgroundImage {...props} />
    );

    expect(wrapper.getNode()).toBe(null);
  });
});
