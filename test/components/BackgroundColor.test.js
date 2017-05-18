import React from "react";
import { mount, shallow } from 'enzyme';

import BackgroundColor from "../../src/components/BackgroundColor";

describe("render", () => {
  test("renders without crashing", () => {
    const props = {
      opacity: 1,
      color: "#FF0000"
    };

    mount(
      <BackgroundColor {...props}/>
    );
  });

  test("should returns null", () => {
    const props = {
      opacity: 0
    };
    
    const wrapper = shallow(
      <BackgroundColor {...props} />
    );
                          
    expect(wrapper.getNode()).toBe(null);
  });
  
  test("should have props", () => {
    const props = {
      opacity: 0.5,
      color: "#FF0000"
    };
    
    const wrapper = shallow(
      <BackgroundColor {...props} />
    );
                          
    expect(wrapper.getNode()).not.toBe(null);
    expect(wrapper.props()).toMatchObject({
      opacity: 0.5,
      fill: "#FF0000",
      width: "100%",
      height: "100%"
    });
  });
});
