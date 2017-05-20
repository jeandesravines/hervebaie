import React from "react";

type Props = {
  canvas: HTMLCanvasElement,
  opacity: ?number
};

/**
 * @param {Object} props
 * @return {*}
 */
export default function BackgroundImage(props: Props) {
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
