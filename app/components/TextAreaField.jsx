import {TextField} from "@shopify/polaris";

const TextareaField = ({value, onChange, ...props}) => {
  return <TextField
    onChange={onChange}
    autoComplete="off"
    multiline={5}
    {...props}
    value={value}
    maxHeight={110}
  />;
};

export default TextareaField;

