import React from "react";
import _ from "lodash";
import { mount, shallow } from "enzyme";
import App from "../../lib/components/App";
import DrawScene from "../../lib/components/DrawScene";

describe("render", () => {
  test("renders without crashing", () => {
    mount(
      <App/>
    );
  });
});

describe("Router", () => {
  test("should have a BrowserRouter", () => {
    const wrapper = shallow(
      <App/>
    );

    const router = wrapper.find("BrowserRouter");
    const routes = {
      "/": DrawScene
    };

    expect(wrapper.find("BrowserRouter")).toHaveLength(1);

    _.forEach(routes, (component, route) => {
      const element = router.find(`Route[path="${route}"]`);

      expect(element).toHaveLength(1);
      expect(element.prop("component")).toBe(component);
    });
  });
});
