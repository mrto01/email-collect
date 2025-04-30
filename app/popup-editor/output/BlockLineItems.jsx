import BlockContainer from './BlockContainer.jsx';

const BlockLineItems = ({items = [], options = {}, wrapper_options = {}}) => {
  let {} = options;

  let style = {};

  return (
    <BlockContainer options={wrapper_options}>
      <div style={style}>
        <table width={'100%'} style={{borderCollapse: 'collapse'}} border={0}>
          <tbody>
          {items.map((item, index) => (<tr key={index}>
            <td width={80} style={{paddingBottom: 10}}>
              <img src={item.imageUrl} alt={''} width={'100%'} style={{verticalAlign: 'middle', display: 'inline-block'}}/>
            </td>
            <td style={{paddingLeft: 10, paddingBottom: 10}}>
              {item.title} x {item.quantity}
              {
                !!item.variantTitle && <p style={{opacity: '0.7'}}>{item.variantTitle}</p>
              }
            </td>
          </tr>))}
          </tbody>
        </table>
      </div>
    </BlockContainer>
  );
};

export default BlockLineItems;

