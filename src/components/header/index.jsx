import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
    width:50%;
    height:75px;
    display:flex;
    justify-content: space-between;
    align-items: baseline;
`;

export default function Header({userName}) {
  return (
    <StyledHeader>
      <h2>Player:{" "} {userName}</h2>
      <h2>CPU</h2>
    </StyledHeader>
  );
}
