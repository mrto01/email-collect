import React from "react";
import BlockContainer from "./BlockContainer.jsx";

const paddingOptions = {xs: '4px 8px', sm: '8px 12px', md: '12px 20px', lg: '16px 32px'}
const borderRadiusOptions = {rectangle: '0', rounded: '4px', pill: '64px'}

const BlockButton = ({options = {}, wrapper_options = {}}) => {
  const {
    content = 'Button', url, button_bg_color, button_size = 'md', button_width = 'auto',
    button_style = 'rounded', button_color
  } = options;
  let padding = paddingOptions[button_size];
  let borderRadius = borderRadiusOptions[button_style];

  let style = {
    display: button_width === 'auto' ? 'inline-block' : 'block',
    textDecoration: 'none',
    padding: padding,
    color: button_color || '#ffffff',
    backgroundColor: button_bg_color || '#0489e4',
    border: 'none',
    borderRadius: borderRadius,
    lineHeight: 1
  };

  return (
    <BlockContainer options={wrapper_options}>
      <a href={url} style={style} onClick={(e) => e.preventDefault()}>{content}</a>
    </BlockContainer>
  )
}

export default BlockButton
