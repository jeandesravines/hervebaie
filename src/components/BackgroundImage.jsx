import React from 'react';

export default ({canvas, opacity}) => (
  <image 
    href={canvas.toDataURL()}
    opacity={opacity}
    preserveAspectRatio="none"
    width="100%"
    height="100%" />
);
