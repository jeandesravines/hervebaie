import React from "react";
import { mount, shallow } from "enzyme";
import createStore from "../mock/store";

import ConnectedImageLoader, { ImageLoader } from "../../src/components/ImageLoader";

beforeAll(() => {
  URL.createObjectURL = (file) => file.data;
});

afterAll(() => {
  delete URL.createObjectURL;
});

describe("render", () => {
  test("renders without crashing", () => {
    const store = createStore({
      setImage: jest.fn()
    });
    
    mount(
      <ConnectedImageLoader store={store} />
    );
  });

  test("should have children", () => {
    const props = {
      setImage: jest.fn()
    };
    
    const wrapper = shallow(
      <ImageLoader {...props} />
    );
 
    const className = "hb-image-loader";
    const label = wrapper.find("label");
    const input = wrapper.find("input[type='file']");
    
    expect(label.props()).toMatchObject({
      htmlFor: `${className}__input`,
      children: "Select an image"
    });
    
    expect(input.props()).toMatchObject({
      id: `${className}__input`,
      className: `${className}__input`,
      type: "file" ,
      accept: "image/*",
      onChange: expect.any(Function)
    });
  });
});

describe("shouldComponentUpdate", () => {
  test("should returns false", () => {
    const wrapper = shallow(
      <ImageLoader />
    );
    
    const shouldComponentUpdate = wrapper
      .instance()
      .shouldComponentUpdate();

    expect(shouldComponentUpdate).toBe(false);
  });
});

describe("onChange", () => {
  test("should call props.setImage", () => {
    const props = {
      setImage: jest.fn()
    };
    
    const wrapper = shallow(
      <ImageLoader {...props} />
    );
    
    wrapper.find("input")
      .simulate("change", {
        target: {
          files: [{
            name: "hello.jpg",
            data: "data:image/png;base64,"
          }]
        }
      });
    
    expect(props.setImage).toHaveBeenCalledWith(
      expect.objectContaining({
        alt: "hello",
        src: "data:image/png;base64,"
      })
    );
  });
});
