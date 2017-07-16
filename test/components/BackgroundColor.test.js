import React from "react";
import { mount, shallow } from "enzyme";
import BackgroundColor from "../../lib/components/BackgroundColor";

describe("render", () => {
  test("renders without crashing", () => {
    const props = {
      opacity: 0.5,
      color: "#FF0000"
    };

    const wrapper = mount(
      <BackgroundColor {...props} />
    );

    expect(wrapper.getNode()).not.toBe(null);
    expect(wrapper.find("rect").props()).toMatchObject({
      opacity: 0.5,
      fill: "#FF0000",
      width: "100%",
      height: "100%"
    });
  });

  test("should returns null", () => {
    const props = { opacity: 0, color: "#FF0000" };
    const wrapper = shallow(
      <BackgroundColor {...props} />
    );

    expect(wrapper.getNode()).toBe(null);
  });
});
