import {InlineGrid, Text, TextField as PlrTextField} from "@shopify/polaris";
import {isValidElement} from "react";

const TextField = ({value, onChange, connectedRight, ...props}) => {
  let label = props?.labelInline ? null : props.label;

  let textField = <PlrTextField
    type="text"
    onChange={onChange}
    autoComplete="off"
    {...props}
    label={label}
    value={value}
    connectedRight={connectedRight && isValidElement(connectedRight) ? connectedRight : null}
  />;

  return props?.labelInline ? <InlineGrid gap={200} columns={{md: "3fr 11fr"}}>
    <Text as="p">{props.label}</Text>
    {textField}
  </InlineGrid> : textField;
};

export default TextField;

