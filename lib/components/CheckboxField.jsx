import React from "react";
import Toggle from "material-ui/Toggle";
import styles from "../assets/styles/components/CheckboxField.scss";

type Props = {
  checked: boolean,
  label: string,
  onChange: Function
};

/**
 * @param {Object} props
 * @return {*}
 */
export default function CheckboxField(props: Props) {
  const { checked, onChange, label } = props;
  const inputStyle = {
    height: "25px"
  };

  return (
    <Toggle
      className={styles.checkboxField}
      inputStyle={inputStyle}
      label={label}
      labelPosition="right"
      toggled={checked}
      onToggle={(e, checked) => onChange(checked)} />
  );
}
