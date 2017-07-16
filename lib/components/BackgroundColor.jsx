import React from "react";

type Props = {
  color: string,
  opacity: ?number
};

/**
 * @param {Object} props
 * @return {*}
 */
export default function BackgroundColor(props: Props) {
  const {color, opacity} = props;

  if (!opacity) {
    return null;
  }

  return (
    <rect
      fill={color}
      height="100%"
      opacity={opacity}
      width="100%"/>
  );
}
