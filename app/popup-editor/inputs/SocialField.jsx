import {BlockStack, Box, Button, Grid, InlineGrid, InlineStack, TextField, Thumbnail} from '@shopify/polaris';
import {XIcon} from '@shopify/polaris-icons';
import facebook from '../../images/facebook.png';
import facebook1 from '../../images/facebook1.png';
import linkedin from '../../images/linkedin.png';
import linkedin1 from '../../images/linkedin1.png';
import instagram from '../../images/instagram.png';
import instagram1 from '../../images/instagram1.png';
import pinterest from '../../images/pinterest.png';
import pinterest1 from '../../images/pinterest1.png';
import twitter from '../../images/twitter.png';
import twitter1 from '../../images/twitter1.png';
import youtube from '../../images/youtube.png';
import youtube1 from '../../images/youtube1.png';
import whatsapp from '../../images/whatsapp.png';
import whatsapp1 from '../../images/whatsapp1.png';
import vimeo from '../../images/vimeo.png';
import tumblr from '../../images/tumblr.png';
import reddit from '../../images/reddit.png';
import x from '../../images/x.png';
import x1 from '../../images/x1.png';

let socialList = [
  facebook,
  linkedin,
  instagram,
  pinterest,
  youtube,
  // twitter,
  x,
  whatsapp,
  vimeo,
  tumblr,
  reddit,
  facebook1,
  linkedin1,
  instagram1,
  pinterest1,
  // twitter1,
  youtube1,
  whatsapp1,
  x1,
];

const SocialField = ({value, onChange, ...props}) => {
  let socialItems = socialList.map((item, i) => `${location.origin}${item}`);

  const addSocial = (url) => {
    let newValue = [];

    if (Array.isArray(value)) {
      newValue = [...value];
    }

    newValue.push({icon: url, url: ''});
    onChange(newValue);
  };

  const inputSocialUrl = (url, i) => {
    let newValue = Array.from(value);
    let row = newValue.find((item, index) => index === i);

    if (row) {
      newValue[i] = {...row, url};
      onChange(newValue);
    }
  };

  const removeSocialItem = (i) => {
    const newValue = [...value.slice(0, i), ...value.slice(i + 1)];
    onChange(newValue);
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
        <Box borderColor={'input-border'} borderWidth={'0165'} borderRadius={'300'} padding={'100'}>
          <InlineGrid columns={9}>
            {
              socialItems.map((item, i) => {
                return (
                  <div key={i} onClick={() => addSocial(item)} style={{width: '24px', cursor: 'pointer', padding: '2px'}}>
                    <Thumbnail source={item} alt={''} size={'20'}/>
                  </div>
                );
              })
            }
          </InlineGrid>
        </Box>
        {
          Array.isArray(value) && value.map(({icon, url = ''}, i) => {
            return (
              <InlineStack gap={'200'} blockAlign={'center'} align={'space-between'} key={i}>
                <img src={icon} alt={''} width={'30'}/>
                <TextField label={''} type={'url'} autoComplete={'off'} value={url}
                           onChange={(v) => inputSocialUrl(v, i)}/>
                <Button icon={XIcon} variant={'tertiary'} onClick={() => removeSocialItem(i)}/>
              </InlineStack>
            );
          })
        }
      </BlockStack>
    </>
  );
};

export default SocialField;
