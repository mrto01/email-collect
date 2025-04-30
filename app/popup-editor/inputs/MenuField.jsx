import {BlockStack, Button, InlineStack, TextField} from '@shopify/polaris';
import {XIcon} from '@shopify/polaris-icons';
import DOMPurify from 'dompurify';

export default function MenuField({value, onChange, ...props}) {
  const addMenu = () => {
    let menu = Array.isArray(value) ? [...value] : [];
    menu.push({title: '', url: ''});
    onChange(menu);
  };

  const removeMenu = (row) => {
    let menu = value.filter((item, i) => i !== row);
    onChange(menu);
  };

  const changeTitle = (title, index) => {
    let menu = value.map((item, i) => {
      if (i === index) {
        return {...item, title: title};
      }
      return item;
    });
    onChange(menu);
  };

  const changeUrl = (url, index) => {
    let menu = value.map((item, i) => {
      if (i === index) {
        url = DOMPurify.sanitize(url);
        return {...item, url: url};
      }
      return item;
    });
    onChange(menu);
  };

  return (
    <>
      <div className="Polaris-Labelled__LabelWrapper">
        <div className="Polaris-Label">
          <label className="Polaris-Label__Text">
            <span className="Polaris-Text--root Polaris-Text--bodyMd">{props.label || ''}</span>
          </label>
        </div>
      </div>
      <BlockStack gap={'200'}>
        {
          Array.isArray(value) && value.map(({title, url}, index) => {
            return <InlineStack gap={'200'} key={index} wrap={false} blockAlign={'center'}>
              <TextField label={''} autoComplete={'on'} placeholder={'Title'} value={title} onChange={(v) => changeTitle(v, index)}/>
              <TextField label={''} autoComplete={'on'} type={'url'} placeholder={'Url'} value={url} onChange={(v) => changeUrl(v, index)}/>
              <Button icon={XIcon} onClick={() => removeMenu(index)} variant={'tertiary'} size={'medium'}/>
            </InlineStack>;
          })
        }
        <Button onClick={addMenu}>Add menu</Button>
      </BlockStack>
    </>
  );
}
