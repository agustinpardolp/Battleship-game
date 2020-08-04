import React from "react";
import { Button as SemanticButton } from "semantic-ui-react";

export default function Button({ disabled, onClick, iconType, content, value, inverted,active}) {
  return (
    <SemanticButton
      content={content}
      icon={iconType?iconType:"default"}
      labelPosition="right"
      color="olive"
      value={value}
      disabled={disabled}
      inverted ={inverted}
      onClick={onClick}
      active ={active?true:false}
    />
  );
}
