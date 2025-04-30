import BlockContainer from './BlockContainer.jsx';

const BlockHeader = ({options = {}, wrapper_options = {}}) => {
  const stopRedirect = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  let {logo = '', logo_width, menu = []} = options;

  let style = {
      width: '100%',
    },
    logoIsImage = false,
    imageStyle = {
      maxWidth: '100%',
      verticalAlign: 'middle',
    };

  if (logo_width) imageStyle.width = `${logo_width}px`;

  const menuParsed = menu.length ? menu.filter((item) => {
    return !!item.title;
  }) : [];

  try {
    logo = new URL(logo);
    logoIsImage = true;
  } catch (e) {

  }

  return (
    <BlockContainer options={wrapper_options}>
      <div style={style}>
        <table width={'100%'} style={{borderCollapse: 'collapse', width: '100%', minWidth: '100%'}} border={0} cellSpacing="0" cellPadding="0">
          <tbody>
          <tr>

            {logo && <td >
              {logoIsImage ? <img src={logo} alt="logo" style={imageStyle}/> : <p>{logo}</p>}
            </td>}

            {
              !!menuParsed.length &&
              <td align={logo ? 'right' : 'left'} >
                <table style={{borderCollapse: 'collapse'}} border={0}>
                  <tbody>
                  <tr>
                    {menuParsed.map(({title, url}, index) => {
                      let style = (menuParsed.length - 1) !== index ? {paddingRight: '10px'} : {};
                      return (
                        <td style={style} key={index}>
                          {url ? <a href={url} style={{textDecoration: 'none', color: 'inherit'}} onClick={stopRedirect}>{title}</a> : <span>{title}</span>}
                        </td>
                      );
                    })}
                  </tr>
                  </tbody>
                </table>
              </td>
            }
          </tr>
          </tbody>
        </table>
      </div>
    </BlockContainer>
  );
};

export default BlockHeader;

