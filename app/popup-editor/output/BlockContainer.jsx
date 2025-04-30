import React from "react";

const BlockContainer = ({options = {}, children}) => {
  const {
    padding_top = 0, padding_left = 0, padding_bottom = 0, padding_right = 0,
    alignment = 'left', color, bg_color, font_size = 15
  } = options;
  let style = {
    padding: `${padding_top}px ${padding_right}px ${padding_bottom}px ${padding_left}px`,
    textAlign: alignment,
    color: color,
    backgroundColor: bg_color,
    fontSize: font_size,
    lineHeight: 1.5,
  }

  return (
    <div style={style}>{children}</div>
  )
}

export default BlockContainer;
