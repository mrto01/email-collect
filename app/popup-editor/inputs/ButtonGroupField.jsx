import {ButtonGroup, Button} from '@shopify/polaris';

export default function ButtonGroupField({value, onChange, ...props}) {
  const {options = []} = props;

  return (
    <>
      <div className="Polaris-Labelled__LabelWrapper">
        <div className="Polaris-Label">
          <label className="Polaris-Label__Text">
            <span className="Polaris-Text--root Polaris-Text--bodyMd">{props.label || ''}</span>
          </label>
        </div>
      </div>
      <ButtonGroup variant="segmented" fullWidth>
        {
          options.map((option, index) =>
            <Button key={index} pressed={value === option.value} onClick={() => onChange(option.value)}>
              {option.label}
            </Button>)
        }
      </ButtonGroup>
    </>
  )
}

