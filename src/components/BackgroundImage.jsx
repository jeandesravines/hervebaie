import React from "react";

/**
 * @param {Object} props
 * @return {*}
 */
export default function BackgroundImage(props: { opacity: ?number, canvas: HTMLCanvasElement }): any {
  const { opacity, canvas } = props; 
  
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
}
