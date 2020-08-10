import React from "react";
import styled from "styled-components";
import {labels} from "../../utils/constants";

const StyledTopBar = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 2%;
  h1 {
    font-style: italic;
    font-size: 5rem;
  }
  img {
    width: 20%;
  }
`;

export default function TopBar() {
  return (
    <StyledTopBar>
      <h1>{labels.mainTitle}</h1>
      <img src={process.env.PUBLIC_URL + "ship.png"} alt="" />
    </StyledTopBar>
  );
}
