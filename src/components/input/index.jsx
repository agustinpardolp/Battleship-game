import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
height:50%;
width:100%;
border-radius: 5px;
margin:2%;
`;
export default function Input({ handleChange, value, label }) {
  return <StyledInput type="text" onChange={handleChange} value={value} placeholder ={label} />;
}
