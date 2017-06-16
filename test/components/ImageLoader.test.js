import React from "react";
import { mount, shallow } from "enzyme";
import Sandbox from "@jdes/jest-sandbox";
import createStore from "../utils/store";
import ConnectedImageLoader, { ImageLoader } from "../../lib/components/ImageLoader";

const sandbox = new Sandbox();

beforeEach(() => {
  sandbox.spyOn(URL, "createObjectURL")
    .mockImplementation(file => file.data);
});

afterEach(() => {
  sandbox.restoreAllMocks();
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
