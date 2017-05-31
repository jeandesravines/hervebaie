import React from "react";
import { mount, shallow } from 'enzyme';

import BackgroundImage from "../../src/components/BackgroundImage";

describe("render", () => {
  test("renders without crashing", () => {
    const props = {
      opacity: 0.5,
      canvas: {
        toDataURL: () => "data:image/png;base64,"
      }
    };

    const wrapper = mount(
      <BackgroundImage {...props} />
    );

    expect(wrapper.getNode()).not.toBe(null);
    expect(wrapper.find("image").props()).toMatchObject({
      href: "data:image/png;base64,",
      opacity: 0.5,
      preserveAspectRatio: "none",
      width: "100%",
      height: "100%"
    });
  });

  test("should returns null", () => {
    const props = { opacity: 0 };
    const wrapper = shallow(
      <BackgroundImage {...props} />
    );

    expect(wrapper.getNode()).toBe(null);
  });
});
