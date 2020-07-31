import React from "react";
import Board from "../../components/board";
import ContentWrapper from "../../components/contentWrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import styled from "styled-components";

const StyledInputContainer = styled.div`
  display: grid;
  height: 60%;
  align-items: center;
  div{
    height: 30%;
  }
`;
export default function Home() {
  return (
    <ContentWrapper>
      <Board />
      <StyledInputContainer>
        <div>
          <Input label={"Player Name"} />
          <Button />
        </div>
      </StyledInputContainer>
    </ContentWrapper>
  );
}
