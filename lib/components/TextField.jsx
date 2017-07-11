import React from "react";
import MaterialTextField from "material-ui/TextField";

type Props = {
  type: string,
  value: string | number,
  onChange: Function,
  label: string,
  min: ?number,
  max: ?number,
  step: ?number,
  pattern: ?string
};

/**
 * @param {Object} props
 * @return {*}
 */
export default function TextField(props: Props) {
  const { type, value, onChange, label, min, max, step, pattern } = props;
  const setValue = (value) => {
    onChange(type === "number" ? Number(value) : value);
  };

  return (
    <MaterialTextField
      fullWidth={true}
      floatingLabelText={label}
      value={value}
      onChange={(e, value) => setValue(value)}
      pattern={pattern}
      min={min}
      max={max}
      step={step}
      type={type} />
  );
}
