import React from "react";
import { shallow } from "enzyme";
import Sandbox from "@jdes/jest-sandbox";
import SelectField from "../../lib/components/SelectField";

const sandbox = new Sandbox();

afterEach(() => {
  sandbox.restoreAllMocks();
});

describe("show", () => {
  it("calls setState", () => {
    const spySetState = sandbox.spyOn(SelectField.prototype, "setState");
    const options = {
      foo: "Bar",
      baz: "Yaz"
    };

    const wrapper = shallow(
      <SelectField
        label="Label"
        name="selector"
        onChange={() => void 0}
        options={options}
        value="foo"/>
    );

    wrapper.instance().show();

    expect(spySetState).toHaveBeenCalledWith({
      opened: true
    });
  });
});

describe("hide", () => {
  it("calls setState", () => {
    const spySetState = sandbox.spyOn(SelectField.prototype, "setState");
    const options = {
      foo: "Bar",
      baz: "Yaz"
    };

    const wrapper = shallow(
      <SelectField
        label="Label"
        name="selector"
        onChange={() => void 0}
        options={options}
        value="foo"/>
    );

    wrapper.instance().hide();

    expect(spySetState).toHaveBeenCalledWith({
      opened: false
    });
  });
});

describe("setValue", () => {
  it("calls props.onChange", () => {
    const onChange = jest.fn();
    const options = {
      foo: "Bar",
      baz: "Yaz"
    };

    const wrapper = shallow(
      <SelectField
        label="Label"
        name="selector"
        onChange={onChange}
        options={options}
        value="foo"/>
    );

    wrapper.instance().setValue("baz");

    expect(onChange).toHaveBeenCalledWith({
      target: {
        name: "selector",
        value: "baz",
        type: "select"
      }
    });
  });

  it("calls hide", () => {
    const spyHide = sandbox.spyOn(SelectField.prototype, "hide");
    const options = {
      foo: "Bar",
      baz: "Yaz"
    };

    const wrapper = shallow(
      <SelectField
        label="Label"
        name="selector"
        onChange={() => void 0}
        options={options}
        value="foo"/>
    );

    wrapper.instance().setValue("baz");

    expect(spyHide).toHaveBeenCalled();
  });
});

describe("setNodeRef", () => {
  it("calls setState", () => {
    const spySetState = sandbox.spyOn(SelectField.prototype, "setState");
    const options = {
      foo: "Bar",
      baz: "Yaz"
    };

    const element = document.createElement("div");
    const wrapper = shallow(
      <SelectField
        label="Label"
        name="selector"
        onChange={() => void 0}
        options={options}
        value="foo"/>
    );

    wrapper.instance().setNodeRef(element);

    expect(spySetState).toHaveBeenCalledWith({
      nodeRef: element
    });
  });
});