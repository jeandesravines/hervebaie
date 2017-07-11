import * as actions from "../../lib/actions/settings";

describe("setValue", () => {
  test("returns a state", () => {
    const expected = {
      type: actions.SETTINGS_SET,
      payload: {
        foo: "bar"
      }
    };

    expect(actions.setValue("foo", "bar")).toMatchObject(expected);
  });
});

describe("setSettings", () => {
  test("returns a state", () => {
    const settings = {
      foo: "bar",
      baz: "yaz"
    };

    const expected = {
      type: actions.SETTINGS_SET,
      payload: {
        foo: "bar",
        baz: "yaz"
      }
    };

    expect(actions.setSettings(settings)).toMatchObject(expected);
  });
});
