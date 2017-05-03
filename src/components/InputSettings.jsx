import React from 'react';
import _ from 'lodash';

type Props = {
  hide: ?boolean,
  label: string,
  name: string,
  onChange: Function,
  options: ?Object,
  type: string,
  value: number | string | boolean
};

export default (props: Props) => {
  const { name, type, label, hide } = props;
  const id = 'input-settings-' + name;
  const style = hide ? {display: 'none'} : {};
  const inputProps = _.omit({...props, id}, ['hide', 'label', 'options']);
  
  const onChange = (e) => {
    const { target } = e;
    const { type } = target;

    if (type === 'number') {
      target.value = Number(target.value);
    } else if (type === 'checkbox') {
      target.value = target.checked;
    }
    
    props.onChange(e);
  };

  if (type === 'radio' || type === 'checkbox') {
     return (
      <div style={style}>
        <input {...inputProps} />
        <label htmlFor={id}>{label}:</label>
      </div>
    );

  } else if (type === 'select') {
    const options = _.map(props.options, (value: string, key: string) => (
      <option key={key} value={key}>{value}</option>
    ));

    return (
      <div style={style}>
        <label htmlFor={id}>{label}:</label>
        <select {...inputProps}>
          {options}
        </select>
      </div>
    );

  } else {
    return (
      <div style={style}>
        <label htmlFor={id}>{label}:</label>
        <input {...inputProps} />
      </div>
    );
  }
};
