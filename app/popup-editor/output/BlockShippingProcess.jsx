import BlockContainer from './BlockContainer.jsx';

const BlockShippingProcess = ({id, options = {}, wrapper_options = {}, trackingData = {}}) => {
  let {canvas_color, header_color, header_background_color, border_color} = options;
  let rows = [],
    trackingDataLength = Object.keys(trackingData).length,
    key = 0,
    padding = border_color ? '8px 15px' : '8px 15px 0 0',
    border = border_color ? `1px solid ${border_color}` : 'none';

  for (const trackingNumber in trackingData) {
    const data = trackingData[trackingNumber];
    const {states = []} = data;

    if (trackingDataLength > 1) {
      rows.push(<tr style={{}} key={trackingNumber}>
        <th colSpan={2} style={{padding: padding, borderTop: border}}>
          {trackingNumber}
        </th>
      </tr>);
    }

    for (const state of states) {
      let date = new Date(state.date).toLocaleString('en-US');
      rows.push(<tr key={key++}>
        <td style={{padding: padding, width: '40%'}}>{date}</td>
        <td style={{padding: padding, width: '60%'}}>{state.status}</td>
      </tr>);
    }
  }

  let tableStyle = {
    backgroundColor: canvas_color,
    borderCollapse: 'collapse',
    border: border,
    minWidth: '100%',
  };

  return (
    <BlockContainer options={wrapper_options}>
      <table width={'100%'} style={tableStyle} cellPadding={0} cellSpacing={0} border={0}>
        <tbody>
        {/*<tr style={{backgroundColor: header_background_color, color: header_color}}>*/}
        {/*  <th style={{padding: '5px 10px'}}>Date</th>*/}
        {/*  <th style={{padding: '5px 10px'}}>Status</th>*/}
        {/*</tr>*/}
        {rows}
        </tbody>
      </table>
    </BlockContainer>
  );
};

export default BlockShippingProcess;

