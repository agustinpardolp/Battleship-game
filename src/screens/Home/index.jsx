import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Board from "../../components/board";
import ContentWrapper from "../../components/contentWrapper";
import Input from "../../components/input";
import Button from "../../components/button";
import styled from "styled-components";
import { setInitialUserGameOption } from "../../redux/actions/";
import Dropdown from "../../components/dropdown";
import Checkbox from "../../components/checkBox";

const StyledInputContainer = styled.div`
  display: grid;
  height: 100%;
  align-items: center;
  & section:first-child {
    display: grid;
    grid-template-rows: 20% 15% 15% 20%;
    align-items: center;
    height:100%;
  }
`;
const Home = ({
  setInitialUserGameOption,
  option,
  letterColumns,
  numberRows,
}) => {
  // let [tempKeyArray, setTempKeyArray] = useState([]);
  // let [tempCellArray, setTempCellArray] = useState([]);

  let [tempKeyArray, setTempKeyArray] = useState([]);
  let [tempCellSelected, setTempCellSelected] = useState({});

  const handleUserChange = (e) => {
    console.log(e);
  };
  const handleInitialOptions = (cellValue) => {
    if (!tempKeyArray.length) {
      setTempCellSelected(cellValue);
      Object.keys(cellValue);
      setTempKeyArray(Object.keys(cellValue));
      console.log(cellValue, tempKeyArray);
    } else {
      if (tempKeyArray.includes(cellValue.name)) {
        tempKeyArray.filter((value) => value !== cellValue.name);
        let tempObjet = { ...tempCellSelected };
        delete tempObjet[cellValue.name];
        setTempCellSelected(tempObjet);
      } else {
        let tempObjet = { ...tempCellSelected, cellValue };
      }
    }

    // if (tempKeyArray.includes(cellValue.name)) {
    //   tempKeyArray.filter((value) => value !== cellValue.name);
    //   setTempKeyArray([...tempKeyArray.filter((value) => value !== cellValue.name)]);
    //   setTempCellArray([...tempCellArray.filter((value) => value.name !== cellValue.name)])
    // } else {
    //   if (tempCellArray.find(cell=> cell.name === cellValue.))
    //   setTempKeyArray([...tempKeyArray, cellValue.name]);
    //   setTempCellArray([...tempCellArray, cellValue])
    // }
  };
  // console.log(tempCellArray)
  return (
    <ContentWrapper>
      <Board
        handleOptions={handleInitialOptions}
        selectedOptions={tempKeyArray}
      />
      <StyledInputContainer>
        <section>
          <Input handleChange={handleUserChange} label={"Player Name"} />
          <Dropdown />
          <Checkbox />
          <Button />
        </section>
      </StyledInputContainer>
    </ContentWrapper>
  );
};

const mapStateToProps = (state) => {
  let { numberRows, letterColumns } = state.UserInitialGameOption;
  return {
    numberRows,
    letterColumns,
  };
};

const mapDispatchToProps = {
  setInitialUserGameOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
