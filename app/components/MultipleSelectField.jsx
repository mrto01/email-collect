import {useState, useCallback} from "react";
import {Tag, InlineStack, Autocomplete} from "@shopify/polaris";

const MultipleSelectField = ({value = [], onChange, error, ...props}) => {
  const deselectedOptions = props?.options || [];
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const selectedOptions = Array.isArray(value) ? value : [];

  const updateText = useCallback(
    (text) => {
      setInputValue(text);

      if (text === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(text, "i");
      const resultOptions = props?.options.filter((option) =>
        option.label.match(filterRegex),
      );

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const selected = [...selectedOptions];
      selected.splice(selected.indexOf(tag), 1);
      onChange(selected);
    },
    [selectedOptions],
  );

  const verticalContentMarkup = selectedOptions.length > 0 ? (
    <InlineStack gap={"200"}>
      {selectedOptions.map((option) => {
        let foundItem = deselectedOptions.find(({value}) => value === option);

        if (!foundItem) return null;

        return (
          <Tag key={`option${option}`} onRemove={removeTag(option)}>
            {foundItem?.label || ""}
          </Tag>
        );
      })}
    </InlineStack>
  ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={props?.label || ""}
      value={inputValue}
      placeholder={props?.placeholder || ""}
      verticalContent={verticalContentMarkup}
      autoComplete="off"
      error={error}
      {...props}
    />
  );

  return (
    <Autocomplete
      allowMultiple
      options={options}
      selected={selectedOptions}
      textField={textField}
      onSelect={onChange}
    />
  );
};

export default MultipleSelectField;
