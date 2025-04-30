import {ActionList, Popover, TextField as PlrTextField} from "@shopify/polaris";
import {useId, useImperativeHandle, useRef, useState} from "react";

export default function TextField({value, onChange, ...props}) {
  const {shortcodes} = props;
  const id = useId();
  const inputRef = useRef(null);
  useImperativeHandle(inputRef, () => document.getElementById(id));
  const [popoverActive, setPopoverActive] = useState(false);

  const addShortcode = (sc) => {
    let start = inputRef.current.selectionStart;
    let end = inputRef.current.selectionEnd;
    let newValue = value.substring(0, start) + sc + value.substring(end);

    onChange(newValue)
  }

  let labelAction, isSection;

  if (shortcodes?.length) {
    let scItems = shortcodes.map(item => {
      if (item?.items?.length) {
        isSection = true;
        return {
          title: item?.title,
          items: item.items.map((sc) => ({
            content: sc.label,
            onAction: () => addShortcode(sc.value)
          }))
        }
      } else {
        return {
          content: item.label,
          onAction: () => addShortcode(item.value)
        }
      }
    });

    const togglePopoverActive = () => setPopoverActive((popoverActive) => !popoverActive);
    const sections = isSection ? scItems : [];
    const items = !isSection ? scItems : null;

    labelAction = {
      content: <Popover active={popoverActive} activator={<div>Shortcode</div>} onClose={togglePopoverActive}>
        <ActionList sections={sections} items={items}/>
      </Popover>,
      onAction: togglePopoverActive,
    }
  }

  return (
    <PlrTextField id={id} label={props.label} autoComplete={'off'} value={value}
                  onChange={onChange} labelAction={labelAction}  {...props}/>
  )
}
