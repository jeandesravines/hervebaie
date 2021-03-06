import React from "react";
import { mount, shallow } from "enzyme";
import Sandbox from "@jdes/jest-sandbox";
import createStore from "redux-mock-store";
import ConnectedImageLoader, { ImageLoader } from "../../lib/components/ImageLoader";

const sandbox = new Sandbox();
const mockStore = createStore([]);

beforeEach(() => {
  sandbox.spyOn(URL, "createObjectURL")
    .mockImplementation(file => file.data);
});

afterEach(() => {
  sandbox.restoreAllMocks();
});

describe("render", () => {
  test("renders without crashing", () => {
    const store = mockStore({
      setImage: jest.fn()
    });

    mount(
      <ConnectedImageLoader store={store}/>
    );
  });

  test("should have children", () => {
    const props = {
      setImage: jest.fn()
    };

    const wrapper = shallow(
      <ImageLoader {...props} />
    );

    const input = wrapper.find("input[type='file']");

    expect(input.props()).toMatchObject({
      type: "file",
      accept: "image/*",
      onChange: expect.any(Function)
    });
  });
});

describe("shouldComponentUpdate", () => {
  test("should returns false", () => {
    const wrapper = shallow(
      <ImageLoader/>
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
