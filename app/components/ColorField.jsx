import {useState} from "react";
import {ColorPicker, hexToRgb, hsbToHex, Popover, rgbToHsb, TextField} from "@shopify/polaris";

let colorPreviewStyle = {
  position: "absolute",
  width: "24px",
  height: "24px",
  borderRadius: "6px",
  border: "1px solid #777777",
  bottom: "4px",
  right: "4px",
  zIndex: 99,
};

const hexToHsb = (color) => rgbToHsb(hexToRgb(color));

const ColorField = ({value, onChange, ...props}) => {
  const [open, setOpen] = useState(false);
  let color = value || "#ffffff";
  const setColor = (newColor) => onChange(hsbToHex(newColor));

  const focus = () => setOpen(true);
  const close = () => setOpen(false);

  const activator = <div style={{position: "relative"}}>
    <TextField label={props.label} value={color} name={props.name} onFocus={focus} autoComplete="off"/>
    <span className="color-preview" style={{backgroundColor: color, ...colorPreviewStyle}} onClick={focus}> </span>
  </div>;

  return <div>
    <Popover active={open} activator={activator} onClose={close} preferredAlignment="left">
      <ColorPicker color={hexToHsb(color)} onChange={setColor}/>
    </Popover>
  </div>;
};

export default ColorField;
