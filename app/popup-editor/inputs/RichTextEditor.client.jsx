import {convertToRaw, EditorState, ContentState, Modifier} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useEffect, useId, useImperativeHandle, useRef, useState} from 'react';
import {useSelectedBlockID} from '../context-store.js';
import {ActionList, Popover} from '@shopify/polaris';

const Combobox = ({options = [], insertText}) => {

  const shortcodes = options;
  const id = useId();
  const inputRef = useRef(null);
  useImperativeHandle(inputRef, () => document.getElementById(id));
  const [popoverActive, setPopoverActive] = useState(false);
  const [error, setError] = useState('');

  let isSection;

  if (!shortcodes?.length) {
    return null;
  }
  let scItems = shortcodes.map(item => {
    if (item?.items?.length) {
      isSection = true;
      return {
        title: item?.title,
        items: item.items.map((sc) => ({
          content: sc.label,
          onAction: () => insertText(sc.value),
        })),
      };
    } else {
      return {
        content: item.label,
        onAction: () => insertText(item.value),
      };
    }
  });

  const togglePopoverActive = () => setPopoverActive((popoverActive) => !popoverActive);
  const sections = isSection ? scItems : [];
  const items = !isSection ? scItems : null;
  const activator = (
    <div onClick={togglePopoverActive}
         className={'rdw-dropdown-wrapper rdw-fontfamily-dropdown vnot-rich-text-combobox'}>
      Shortcodes
    </div>
  );

  return (
    <>
      <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive}>
        <ActionList sections={sections} items={items}/>
      </Popover>
    </>
  );
};

export default function RichTextEditor({value, onChange, ...props}) {
  const {shortcodes = []} = props;
  const selectedBlockID = useSelectedBlockID();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    let rawContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onChange(rawContent);
  };

  const insertTextAtCaret = (text) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const newContent = Modifier.insertText(currentContent, selection, text);
    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');

    setEditorState(newEditorState);
  };

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(value);
    const {contentBlocks, entityMap} = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    setEditorState(EditorState.createWithContent(contentState));
  }, [selectedBlockID]);

  const customButtons = [];
  if (Array.isArray(shortcodes) && shortcodes.length > 0) {
    customButtons.push(<Combobox options={props.shortcodes} insertText={insertTextAtCaret}/>);
  }

  return (
    <Editor
      toolbar={{
        options: ['inline', 'fontFamily', 'link', 'textAlign', 'colorPicker', 'emoji', 'image', 'fontSize', 'remove', 'history'],
        inline: {
          options: ['bold', 'italic', 'underline'],
        },
        textAlign: {
          options: ['left', 'center', 'right'],
        },
        fontSize: {
          className: 'vnot-rich-text-font-size',
        },
      }}
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      toolbarCustomButtons={customButtons}
    />
  );
}
