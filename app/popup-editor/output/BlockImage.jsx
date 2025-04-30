import React from "react";
import BlockContainer from "./BlockContainer.jsx";

const BlockImage = ({options = {}, wrapper_options}) => {
  let {url = '', image_width} = options;
  let imgWidth = '100%'

  if (image_width !== 'undefined' && image_width !== '' && image_width !== null) {
    imgWidth = `${image_width}px`
  }

  let styles = {
    width: imgWidth,
    verticalAlign: 'middle',
    maxWidth: '100%'
  }

  return (
    <BlockContainer options={wrapper_options}>
      <img src={url || 'https://placehold.co/600x400?text=Image'} style={styles}/>
    </BlockContainer>
  )
}


export default BlockImage;
