import React from "react";

export default ({ color, opacity }) => {
  if (!opacity) {
    return null;
  }

  return <rect fill={color} opacity={opacity} width="100%" height="100%" />;
};
