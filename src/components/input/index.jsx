import React from "react";
import styled from "styled-components";
import { Input as SemanticInput } from 'semantic-ui-react'

// const StyledInput = styled.input`
// height:50%;
// width:100%;
// border-radius: 5px;
// margin:2%;
// `;
export default function Input({ handleChange, value, label }) {
  return <SemanticInput type="text" onChange={handleChange} value={value} placeholder ={label} />;
}

