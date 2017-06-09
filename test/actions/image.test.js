import * as actions from "../../src/actions/image";

describe("setImage", () => {
  test("returns a state", () => {
    const image = new Image();
    const expected = {
      type: actions.IMAGE_SET,
      payload: image
    };

    expect(actions.setImage(image)).toMatchObject(expected);
  });
});
