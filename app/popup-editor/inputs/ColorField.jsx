import {Popover, hsbToHex, ColorPicker, rgbToHsb, hexToRgb, TextField} from '@shopify/polaris';
import {useState} from 'react';

let colorPreviewStyle = {
  position: 'absolute',
  width: '24px',
  height: '24px',
  borderRadius: '6px',
  border: '1px solid #777777',
  bottom: '4px',
  right: '4px',
  zIndex: 99,
};

const hexToHsb = (color) => rgbToHsb(hexToRgb(color));

export default function ColorField({value, onChange, ...props}) {
  const [open, setOpen] = useState(false);
  const setColor = (newColor) => onChange(hsbToHex(newColor));

  const focus = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen(!open);

  const activator = <div style={{position: 'relative'}}>
    <TextField label={props.label} value={value} name={props.name} placeholder={value ? '' : 'Transparent'}
               onFocus={focus} onChange={onChange} autoComplete="off"/>
    <span className="color-preview" style={{backgroundColor: value, ...colorPreviewStyle}} onClick={toggle}> </span>
  </div>;

  return <div>
    <Popover active={open} activator={activator} onClose={close} preferredAlignment="right">
      <ColorPicker color={hexToHsb(value)} onChange={setColor}/>
    </Popover>
  </div>;
}

