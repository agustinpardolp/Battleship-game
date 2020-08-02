import React from "react";
import styled from "styled-components";
import { Button as SemanticButton } from "semantic-ui-react";

const StyledButton = styled.button`
  font-size: 1.1rem;
  width: 50%;
  height: 48%;
  background: #0bc555;
  border-radius: 25px;
  box-shadow: 1px 2px 4px;
`;
export default function Button() {
  return (
    <SemanticButton
      content="Start Game"
      icon="right arrow"
      labelPosition="right"
      basic
      color="olive"
    />
  );
}
