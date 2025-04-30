import {TextField} from '@shopify/polaris';

export default function NumberField({value, onChange, ...props}) {
  const handleChange = (n) => {
    n = n ? parseFloat(n) : n;
    if (props.hasOwnProperty('min')) {
      if (n < props.min) n = props.min;
    }

    if (props.hasOwnProperty('max')) {
      if (n > props.max) n = props.max;
    }

    onChange(n);
  };

  return <TextField type={'number'} label={props.label}
                    autoComplete={'off'} value={value} onChange={handleChange} {...props}/>;
}
