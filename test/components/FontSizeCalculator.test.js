import React from "react";
import { mount, shallow } from "enzyme";
import _ from "lodash";
import Sandbox from "@jdes/jest-sandbox";
import createStore from "redux-mock-store";
import ConnectedFontSizeCalculator, { FontSizeCalculator } from "../../lib/components/FontSizeCalculator";

const sandbox = new Sandbox();
const mockStore = createStore([]);

beforeEach(() => {
  sandbox.spyOn(HTMLUnknownElement.prototype, "getBBox")
    .mockReturnValue({x: -5, y: -5, width: 600, height: 800});
});

afterEach(() => {
  sandbox.restoreAllMocks();
});

describe("render", () => {
  it("renders without crashing", () => {
    const store = mockStore({
      fonts: {
        Arial: {family: "Arial"},
        Helvetica: {family: "Helvetica"}
      }
    });

    mount(
      <ConnectedFontSizeCalculator store={store}/>
    );
  });

  it("contains Fonts", () => {
    const props = {
      fonts: {
        Arial: {family: "Arial"},
        Helvetica: {family: "Helvetica"}
      }
    };

    const wrapper = shallow(
      <FontSizeCalculator {...props} />
    );

    _.forEach(props.fonts, (font) => {
      expect(
        wrapper.find(`svg Font[family="${font.family}"]`)
      ).toHaveLength(1);
    });
  });
});

describe("shouldComponentUpdate", () => {
  test("should returns false", () => {
    const wrapper = shallow(
      <FontSizeCalculator/>
    );

    const shouldComponentUpdate = wrapper
      .instance()
      .shouldComponentUpdate();

    expect(shouldComponentUpdate).toBe(false);
  });
});

describe("setFont", () => {
  test("should call the props.setFont function", () => {
    const props = {
      fonts: {
        Arial: {family: "Arial,monospace"},
        Helvetica: {family: "Helvetica,monospace"}
      },
      setFont: jest.fn()
    };

    mount(
      <FontSizeCalculator {...props} />
    );

    const fontProps = {dx: 0.01, dy: 0.01, width: 1.2, height: 1.58};
    const calls = props.setFont.mock.calls;
    const expected = _.map(props.fonts, (font, name) => [
      name, {...fontProps, family: font.family}
    ]);

    expect(calls).toEqual(
      expect.arrayContaining(expected)
    );
  });
});
