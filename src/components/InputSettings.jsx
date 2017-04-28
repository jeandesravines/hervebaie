import React from 'react';
import _ from 'lodash';

export default (props: Object): any => {
  const { name, type, label, show = true } = props;
  const style = show ? {} : {display: 'none'};

  if (type === 'radio' || type === 'checkbox') {
     return (
      <div style={style}>
        <input {...props} />
        <label htmlFor={name}>{label}:</label>
      </div>
    );
    
  } else if (type === 'select') {
    const options = _.map(props.options, (value: string, key: string) => (
      <option key={key} value={key}>{value}</option>
    ));
    
    return (
      <div style={style}>
        <label htmlFor={name}>{label}:</label>
        <select {...props}>
          {options}
        </select>
      </div>
    );
    
  } else {
    return (
      <div style={style}>
        <label htmlFor={name}>{label}:</label>
        <input {...props} />
      </div>
    );
  }
};
