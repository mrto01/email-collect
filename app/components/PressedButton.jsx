import {Button, ButtonGroup} from "@shopify/polaris";
import React from "react";

const PressedButton = ({value, onChange, ...props}) => {

  let {options = []} = props;

  const buttons = options.map(
    (opt) => <Button key={opt.value} pressed={value === opt.value} onClick={() => onChange(opt.value)}>
      {opt.label}
    </Button>,
  );

  return (
    <div>
      <label style={{marginBottom: "var(--p-space-100)", display: "block"}}>{props.label}</label>
      <ButtonGroup variant="segmented" fullWidth>
        {buttons}
      </ButtonGroup>
    </div>
  );
};

export default PressedButton;
