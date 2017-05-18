import React from "react";
import _ from "lodash";
import { mount, shallow } from 'enzyme';

import App from "../../src/components/App";
import DrawScene from "../../src/components/DrawScene";

describe("render", () => {
  test("renders without crashing", () => {
    mount(
      <App />
    );
  });
  
  test("is a .app", () => {
    const wrapper = shallow(
      <App />
    );

    expect(wrapper.is(".app")).toBe(true);
  });
});
  
describe("Router", () => {
  test("should have a BrowserRouter", () => {
    const wrapper = shallow(
      <App />
    );

    expect(wrapper.find("BrowserRouter")).toHaveLength(1);
  });
  
  test("contains all routes", () => {
    const wrapper = shallow(
      <App />
    );
      
    const router = wrapper.find("BrowserRouter");
    const routes = {
      "/draw": DrawScene 
    };
    
    _.forEach(routes, (component, route) => {
      const element = router.find(`Route[path="${route}"]`);
      
      expect(element).toHaveLength(1);
      expect(element.prop("component")).toBe(component);
    });
  });
});
