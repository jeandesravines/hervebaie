import reduce from "../../lib/reducers/fonts";
import { FONTS_SET } from "../../lib/actions/fonts";

describe("reduce", () => {
  test("return the default state", () => {
    const action = {
      type: "unknown"
    };

    expect(reduce(undefined, action)).toMatchObject({
      monospace: {
        family: "monospace,monospace"
      }
    });
  });
});

describe("FONTS_SET", () => {
  test("return a state", () => {
    const action = {
      type: FONTS_SET,
      payload: {
        Arial: {
          family: "Arial,monospace",
          size: 22
        }
      }
    };

    expect(reduce(undefined, action)).toMatchObject(action.payload);
  });
});