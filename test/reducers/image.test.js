import reduce from "../../src/reducers/image";
import { IMAGE_SET } from "../../src/actions/image";

describe("reduce", () => {
  test("return the default state", () => {
    const action = {
      type: 'unknown'
    };

    expect(reduce(undefined, action)).toBe(null);
  });
});

describe("IMAGE_SET", () => {
  test("return a state", () => {
    const action = {
      type: IMAGE_SET,
      payload: new Image(800, 600)
    };

    const state = reduce(undefined, action);

    expect(state.localName).toBe('img');
    expect(state).not.toBe(action.payload);
    expect(state).toMatchObject(
      expect.objectContaining({
        width: 800,
        height: 600
      })
    );
  });
});