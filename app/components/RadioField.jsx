import {RadioButton} from "@shopify/polaris";

const RadioField = ({name, choices, value, onChange}) => {
  return (
    <>
      {choices.map((choice, index) => {
        let checked = choice.value === value;
        return (
          <>
            <RadioButton
              key={index}
              label={choice.label}
              checked={checked}
              name={name}
              onChange={() => onChange(choice.value)}
            />
            { choice?.render && checked && choice.render() }
          </>
        )
      })}
    </>
  )
}
export default RadioField;
