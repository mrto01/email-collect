import {Checkbox, Text} from "@shopify/polaris";

const CheckboxField = ({value, onChange, ...props}) => {
  return (
    <div>
      <Text as="p" variant="bodyMd">
        {props.label}
      </Text>
      <Checkbox
        checked={value}
        onChange={onChange}
        {...props}
        label={props.desc}
        value="on"
      />
    </div>
  );
};

export default CheckboxField;
