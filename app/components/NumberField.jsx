import React from "react";
import TextField from "./TextField.jsx";

const NumberField = ({value = "", onChange, ...props}) => {
  // let inputValue = typeof value === 'undefined' ? '' : value;
  const handleChange = (n) => {
    n = n ? parseFloat(n) : n;
    if (props.hasOwnProperty("min")) {
      if (n < props.min) n = props.min;
    }

    if (props.hasOwnProperty("max")) {
      if (n > props.max) n = props.max;
    }

    onChange(n);
  };

  if (value === null) value = "";

  return <TextField
    type="number"
    {...props}
    onChange={handleChange}
    autoComplete="off"
    value={value}
  />;
};

export default NumberField;
