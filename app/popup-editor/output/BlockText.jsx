import BlockContainer from './BlockContainer.jsx';
// import sanitizeHtml from 'sanitize-html';
import DOMPurify from 'dompurify';

const BlockText = ({options = {}, wrapper_options = {}}) => {
  let {content = 'Text'} = options;
  content = content.replaceAll('\n', '<br/>');

  if (typeof window !== 'undefined') {
    content = DOMPurify.sanitize(content);
  }

  content = content.replace(/(<br\s*\/?>)+$/g, '');

  return (
    <BlockContainer options={wrapper_options}>
      <div dangerouslySetInnerHTML={{__html: content}}/>
    </BlockContainer>
  );
};

export default BlockText;

