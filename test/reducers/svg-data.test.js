import reduce from "../../src/reducers/svg-data";
import { DATA_SET } from "../../src/actions/svg-data";

describe("reduce", () => {
  test("return the default state", () => {
    const action = {
      type: 'unknown'
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

  test("return a state", () => {
    const action = {
      type: DATA_SET,
      payload: "data:"
    };
    
    const state = reduce(undefined, action);
    
    expect(state).toBe(action.payload);
  });
});