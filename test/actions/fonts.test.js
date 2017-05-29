import * as actions from "../../src/actions/fonts";

describe("setFont", () => {
  test("returns a state", () => {
    const font = {
      family: "Arial,monospace"  
    };
    
    const expected = {
      type: actions.FONTS_SET,
      payload: {
        Arial: font
      }
    };
    
    expect(actions.setFont("Arial", font)).toMatchObject(expected);
  });
});
