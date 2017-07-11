import React from "react";
import MaterialSelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import _ from "lodash";

type Props = {
  label: string,
  onChange: Function,
  options: Object,
  value: string | number
};

/**
 * @param {Object} props
 * @return {*}
 */
export default function SelectField(props: Props) {
  const { label, value, onChange } = props;
  const options = _.map(props.options, (text: string, key: string) => (
    <MenuItem
      key={key}
      value={key}
      primaryText={text} />
  ));

  return (
    <MaterialSelectField
      floatingLabelText={label}
      fullWidth={true}
      value={value}
      onChange={(e, i, value) => onChange(value)}>
      {options}
    </MaterialSelectField>
  );
}
