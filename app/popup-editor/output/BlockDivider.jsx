import BlockContainer from "./BlockContainer.jsx";

const BlockDivider = ({options = {}, wrapper_options = {}}) => {
  let {color = 0, thickness = 1} = options;

  let style = {
    borderTop: `${thickness}px solid ${color}`
  }

  return (
    <BlockContainer options={wrapper_options}>
      <div style={style}/>
    </BlockContainer>
  )
}

export default BlockDivider;

