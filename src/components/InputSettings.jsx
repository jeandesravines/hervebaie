import React, { PureComponent } from "react";
import _ from "lodash";

type Props = {
  hide: ?boolean,
  label: string,
  pattern: ?string,
  onChange: Function,
  options: ?Object,
  type: string,
  min: ?number,
  max: ?number,
  step: ?number,
  value: number | string | boolean,
  toString: ?(value: any) => string
};

export default class InputSettings extends PureComponent<void, Props> {
  /**
   * @const {Object}
   */
  props: Props;

  static getCheckboxElement(props: Props) {
    const { checked, onChange, label } = props;
    const inputProps = {
      checked,
      onChange: e => onChange(e.target.checked),
      type: "checkbox"
    };

    return (
      <div>
        <label>{label}</label>
        <input {...inputProps} />
      </div>
    );
  }

  static getSelectElement(props: Props) {
    const { label, value, onChange } = props;
    const inputProps = {
      value,
      onChange
    };

    const options = _.map(props.options, (label: string, key: string) => (
      <option
        key={key}
        value={key}>
        {label}
      </option>
    ));

    return (
      <div>
        <label>{label}</label>
        <select {...inputProps}>
          {options}
        </select>
      </div>
    );
  }

  static getTextFieldElement(props: Props) {
    const {
      type,
      value,
      onChange,
      label,
      min,
      max,
      step,
      pattern
    } = props;

    const getValue = (e) => {
      return type === "number" ?
        Number(e.target.value) :
        e.target.value;
    };

    const inputProps = {
      label,
      value,
      onChange: e => onChange(getValue(e)),
      pattern,
      min,
      max,
      step,
      type
    };

    return (
      <div>
        <label>{label}</label>
        <input {...inputProps} />
      </div>
    );
  }

  static getSliderElement(props: Props) {
    const { onChange, label, value, toString } = props;
    let { min = 0, max, step } = props;
    let textValue = toString ? toString(value) : value;
    let intValue = value;

    if (min < 0 || max - min <= 1) {
      min *= 100;
      max *= 100;
      step *= 100;
      intValue = Number.parseInt(value * 100, 10);
    }

    const inputProps = {
      value: intValue,
      min,
      max,
      step,
      onChange: e => onChange(e.target.value / 100),
      type: "range"
    };

    return (
      <div>
        <label>{label}</label>
        <input {...inputProps} />
        <span>{textValue}</span>
      </div>
    );
  }

  render() {
    if (this.props.hide) {
      return null;
    }

    switch (this.props.type) {
    case "checkbox":
      return InputSettings.getCheckboxElement(this.props);
    case "slider":
      return InputSettings.getSliderElement(this.props);
    case "select":
      return InputSettings.getSelectElement(this.props);
    default:
      return InputSettings.getTextFieldElement(this.props);
    }
  }
}
