import React, { Component } from "react";
import { Button, Checkbox as SemanticCheckBox } from "semantic-ui-react";
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

const StyledButtonContainer = styled.div`

`;

export default class Checkbox extends Component {
  state = {};
  handleClick = (e, { value }) => this.setState({ value });

  render() {
    return (
      <StyledCheckBoxContainer>
        <span>
          Orientacion: <b>{this.state.value}</b>
        </span>
        <StyledButtonContainer>
          <Button onClick={this.handleClick} value="vertical">
            Vertical
          </Button>
          <Button onClick={this.handleClick} value="horizontal">
            Horizontal
          </Button>
        </StyledButtonContainer>
        {/* <SemanticCheckBox
          radio
          label="Vertical"
          name="checkboxRadioGroup"
          value="vertical"
          checked={this.state.value === "vertical"}
          onChange={this.handleChange}
         
        />
        <SemanticCheckBox
          radio
          label="Or that"
          name="checkboxRadioGroup"
          value="horizontal"
          checked={this.state.value === "horizontal"}
          onChange={this.handleChange}
        /> */}
      </StyledCheckBoxContainer>
    );
  }
}
