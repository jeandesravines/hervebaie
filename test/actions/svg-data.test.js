import * as actions from "../../src/actions/svg-data";

describe("setSvgData", () => {
  test("returns a state", () => {
    const data = new Blob();
    const expected = {
      type: actions.DATA_SET,
      payload: data
    };

    expect(actions.setSvgData(data)).toMatchObject(expected);
  });
});
