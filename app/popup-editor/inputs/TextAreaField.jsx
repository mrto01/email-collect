import {ActionList, Box, Popover, TextField} from '@shopify/polaris';
import React, {useEffect, useId, useImperativeHandle, useRef, useState} from 'react';
import Mustache from 'mustache';
import RichTextEditor from './RichTextEditor.client.jsx';
// import {Editor} from 'react-draft-wysiwyg';
// import {ClientOnly} from 'remix-utils/client-only';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import EmailEditorPage from '../index.jsx';
// import RichTextEditor from './test.jsx';

// export default function TextAreaField({value, onChange, ...props}) {
//   const {shortcodes} = props;
//   const id = useId();
//   const inputRef = useRef(null);
//   useImperativeHandle(inputRef, () => document.getElementById(id));
//   const [popoverActive, setPopoverActive] = useState(false);
//   const [error, setError] = useState('');
//
//   const addShortcode = (sc) => {
//     let start = inputRef.current.selectionStart;
//     let end = inputRef.current.selectionEnd;
//     let newValue = value.substring(0, start) + sc + value.substring(end);
//
//     onChange(newValue);
//     inputRef.current.focus();
//   };
//
//   let labelAction, isSection;
//
//   if (shortcodes?.length) {
//     let scItems = shortcodes.map(item => {
//       if (item?.items?.length) {
//         isSection = true;
//         return {
//           title: item?.title,
//           items: item.items.map((sc) => ({
//             content: sc.label,
//             onAction: () => addShortcode(sc.value),
//           })),
//         };
//       } else {
//         return {
//           content: item.label,
//           onAction: () => addShortcode(item.value),
//         };
//       }
//     });
//
//     const togglePopoverActive = () => setPopoverActive((popoverActive) => !popoverActive);
//     const sections = isSection ? scItems : [];
//     const items = !isSection ? scItems : null;
//
//     labelAction = {
//       content: <Popover active={popoverActive} activator={<div>Shortcodes</div>} onClose={togglePopoverActive}>
//         <ActionList sections={sections} items={items}/>
//       </Popover>,
//       onAction: togglePopoverActive,
//     };
//   }
//
//   useEffect(() => {
//     try {
//       Mustache.render(value, {});
//       setError('');
//     } catch (e) {
//       setError('Invalid shortcode format');
//     }
//   }, [value]);
//
//   return (
//     <TextField id={id} label={props.label} autoComplete={'off'} value={value} error={error}
//                onChange={onChange} labelAction={labelAction} multiline={5} maxHeight={150} {...props}/>
//   );
// }

export default function TextAreaField({value, onChange, ...props}) {

  return (
    <Box borderWidth={'0165'} borderRadius={'200'} borderColor={'input-border'} padding={'200'}>
      <RichTextEditor value={value} onChange={onChange} {...props}/>
    </Box>
  );
}
