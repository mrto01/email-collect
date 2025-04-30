import React from 'react';
import BlockContainer from './BlockContainer.jsx';

const BlockSocial = ({options = {}, wrapper_options = {}}) => {
  const {social = []} = options;
  const {alignment} = wrapper_options;

  let imgStyle = {
    width: '24px',
    verticalAlign: 'middle',
  };

  return (
    <BlockContainer options={wrapper_options}>
      <table style={{borderCollapse: 'collapse', width: '100%', minWidth: '100%'}} width="100%" cellPadding={0} cellSpacing={0} border={0}>
        <tbody>
        <tr>
          <td align={alignment}>
            <table style={{borderCollapse: 'collapse'}} cellPadding={0} cellSpacing={0} border={0}>
              <tbody>
              <tr>
                {!!social.length &&
                  social.map(({icon, url}, i) => {
                    let paddingRight = i === social.length - 1 ? '0' : '5px';
                    return (
                      <td key={i} style={{paddingRight: paddingRight}}>
                        <a href={url} style={{display: 'block'}}>
                          <img src={icon} alt={''} style={imgStyle}/>
                        </a>
                      </td>
                    );
                  })
                }
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
    </BlockContainer>
  );
};

export default BlockSocial;
