import React from "react";

type Props = {
  color: string,
  opacity: number
};

export default function BackgroundColor({ color, opacity }: Props) {
  if (!opacity) {
    return null;
  }

  return (
    <rect 
      fill={color} 
      opacity={opacity} 
      width="100%" 
      height="100%" />  
  );
}
