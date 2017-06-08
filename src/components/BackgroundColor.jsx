import React from "react";

type Props = {
  +color: string,
  +opacity: ?number
};

/**
 * @param {{
 *   color: string,
 *   opacity: ?number
 * }} props
 * @return {*}
 */
export default function BackgroundColor(props: Props) {
  const { color, opacity } = props;
  
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
