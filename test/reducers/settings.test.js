import reduce from "../../lib/reducers/settings";
import { SETTINGS_SET } from "../../lib/actions/settings";

describe("reduce", () => {
  test("returns the default state", () => {
    const action = {
      type: "unknown"
    };

    expect(reduce(undefined, action)).toMatchObject({
      backgroundImageAlpha: expect.any(Number),
      backgroundColor: expect.any(String),
      backgroundColorAlpha: expect.any(Number),
      fontName: expect.any(String),
      fontSize: expect.any(Number),
      maxSize: expect.any(Number),
      rgb: expect.any(Boolean),
      contrast: expect.any(Number)
    });
  });
});

describe("SETTINGS_SET", () => {
  test("returns a state", () => {
    const action = {
      type: SETTINGS_SET,
      payload: {
        backgroundImageAlpha: 0.7,
        backgroundColor: "#FF0000",
        backgroundColorAlpha: 0.5,
        fontName: "Arial",
        fontSize: 22,
        maxSize: 1080,
        rgb: true,
        contrast: 0.7
      }
    };

    expect(reduce(undefined, action)).toMatchObject(action.payload);
  });
});