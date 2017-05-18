import React from "react";

type Props = {
  canvas: HTMLCanvasElement,
  opacity: number
};

export default function BackgroundImage({ canvas, opacity }: Props) {
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
