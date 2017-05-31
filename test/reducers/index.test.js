import reduce from "../../src/reducers/index";

describe("reduce", () => {
  test("should contains all reducers", () => {
    const action = {
      type: "UNKNOWN",
      payload: null
    };

    expect(reduce(void 0, action)).toMatchObject({
      fonts: expect.any(Object),
      image: null,
      settings: expect.any(Object),
      svgData: null
    });
  });
});
