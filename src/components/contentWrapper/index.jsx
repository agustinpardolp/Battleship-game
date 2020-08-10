import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 60%;
  display: grid;
  justify-content: center;
  grid-template-columns: 50% 40%;
  @media (max-width: 1440px) {
    width: 80%;
  }
`;

export default function ContentWrapper({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
