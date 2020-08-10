import React from "react";
import styled from "styled-components";
import { Input as SemanticInput } from "semantic-ui-react";

const StyledInput = styled(SemanticInput)`
  height: 50px;
  width: 100%;
  border-radius: 5px;
  input {
    font-size: 0.8em;
  }
`;
const Input = ({ handleChange, value, label }) => {
  return (
    <StyledInput
      type="text"
      onChange={handleChange}
      value={value}
      placeholder={label}
    />
  );
};

export default React.memo(Input);
