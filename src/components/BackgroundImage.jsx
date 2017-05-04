import React from "react";

export default ({ canvas, opacity }) => {
  if (!opacity) {
    return null;
  }

  return (
    <image
      href={canvas.toDataURL()}
      opacity={opacity}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    />
  );
};
