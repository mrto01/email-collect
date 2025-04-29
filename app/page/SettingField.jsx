import {Button, Checkbox, Divider, Select, Text} from "@shopify/polaris";
import {useEffect} from "react";
import {
  TextField, ColorField, PressedButton, NumberField, TextAreaField, InsertBlockField, InfoField,
  DatePickerField, MultipleSelectField
} from "../components/index.jsx";

const componentMap = {
  text: TextField,
  number: NumberField,
  select: Select,
  pressed_button: PressedButton,
  color: ColorField,
  // checkbox: CheckboxField,
  textarea: TextAreaField,
  date_picker: DatePickerField,
  insert_block: InsertBlockField,
  info_block: InfoField,
  divider: Divider,
  multi_select: MultipleSelectField,
};

const SettingField = ({type = "", errors = {}, settings = {}, settingChange, ...props}) => {
  delete props.type;

  const error = errors[props.name] || "";
  const value = settings[props.name];

  let depend = props?.depend ? [settings[props.depend]] : [];

  useEffect(() => {
    if (props?.onDepend && typeof props.onDepend === "function") {
      let newDependValue = props.onDepend(value, settings[props.depend]);
      settingChange(props.name, newDependValue);
    }
  }, depend);

  if (typeof props.isShowing === "function" && !props.isShowing(settings)) {
    return null;
  }

  switch (type) {
    case "label":
      return props.label ? <Text as="p">{props.label}</Text> : null;

    case "upgrade_to_pro":
      return <Button url="/app/plans">Upgrade to Pro</Button>;
  }

  const onChange = (newValue) => {
    if (typeof props.onChange === "function") {
      newValue = props.onChange(settings, newValue);
    }
    settingChange(props.name, newValue);
  };

  let connectedRight = props.connectedRight ? (<SettingField {...props.connectedRight} />) : null;
  delete props.connectedRight;

  if (type === "checkbox") {
    if (!props.label && props.helpText) {
      props.label = props.helpText;
      props.helpText = "";
    }
    return <Checkbox {...props} checked={value} onChange={onChange} value="on" error={error}/>;
  }

  if (type === "custom") {
    return props.render(value, onChange, error, props);
  }

  const Component = componentMap[type];

  if (!Component) return null;

  return (
    <Component {...props} value={value} onChange={onChange} connectedRight={connectedRight} error={error}/>
  );
};

export default SettingField;
