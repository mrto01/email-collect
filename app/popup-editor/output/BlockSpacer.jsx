import BlockContainer from "./BlockContainer.jsx";

const BlockSpacer = ({options = {}, wrapper_options = {}}) => {
  let {height = 0} = options;

  let style = {
    height: `${height}px`
  }

  return (
    <BlockContainer options={wrapper_options}>
      <div style={style}/>
    </BlockContainer>
  )
}

export default BlockSpacer;

