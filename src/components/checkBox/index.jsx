import React from "react";
import Button from "../button";
import styled from "styled-components";

const StyledCheckBoxContainer = styled.div`
  height: 100%;
  display: inherit;
  margin-top: 6%;
  span {
    font-size: 1.5rem;
    margin-bottom: 2%;
  }
  Button {
    color: white;
  }
`;

const StyledButtonContainer = styled.div``;

const Checkbox = ({ value, handleChange }) => {
  return (
    <StyledCheckBoxContainer>
      <span>
        Orientation: <b>{value}</b>
      </span>
      <StyledButtonContainer>
        <Button
          onClick={handleChange}
          value={"vertical"}
          content="vertical"
          iconType="arrows alternate vertical"
          inverted
          color="olive"
        >
          Vertical
        </Button>
        <Button
          onClick={handleChange}
          value={"horizontal"}
          iconType="arrows alternate horizontal"
          content="horizontal"
          inverted
          color="olive"
        >
          Horizontal
        </Button>
      </StyledButtonContainer>
    </StyledCheckBoxContainer>
  );
};
export default React.memo(Checkbox);
