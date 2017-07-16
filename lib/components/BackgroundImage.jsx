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
  const {opacity, canvas} = props;

  if (!opacity) {
    return null;
  }

  return (
    <image
      height="100%"
      href={canvas.toDataURL()}
      opacity={opacity}
      preserveAspectRatio="none"
      width="100%"/>
  );
}
