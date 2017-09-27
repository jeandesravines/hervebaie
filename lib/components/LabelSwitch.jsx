import React from "react";
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

type Props = {
  label: string,
  name: string,
  checked: boolean,
  onChange: Function
};

/**
 * @param {Object} props
 * @return {*}
 */
export default function LabelSwitch(props: Props) {
  const control = (
    <Switch
      name={props.name}
      onChange={props.onChange}
      checked={props.checked} />
  );

  return (
    <FormControlLabel
      label={props.label}
      control={control} />
  );
}