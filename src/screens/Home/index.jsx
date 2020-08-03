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
    height: 100%;
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
  let [selectedShipType, setSelectedShipType] = useState({
    "Cruisers-1": [],
    "Cruisers-2": [],
    "Cruisers-3": [],
    Submarine: [],
    Carrier: [],
  });
  let [waterArray, setWaterArray] = useState([])
  let [shipType, setShipType] = useState("");
  let [orientation, setOrientation] = useState("vertical");

  const handleUserChange = (e) => {
    console.log(e);
  };
  const handleInitialOptions = (cellValue, waterValues) => {
    
    
    // console.log(
    //   waterArray.find((element) => {
    //     console.log(element, cellValue[0]);
    //     return element === cellValue[0];
    //   })
    // );
    // // console.log(waterArray.find(cellValue[0]), cellValue)
    if (cellValue && !selectedShipType[shipType.name].length) {
      if (
        waterArray.find((element) => element === cellValue[0]) === undefined
      ) {
        setSelectedShipType({
          ...selectedShipType,
          [shipType.name]: cellValue,
        });
        setWaterArray([...waterArray, ...waterValues ])
      }
    } 
    else {
      setSelectedShipType({
        ...selectedShipType,
        [shipType.name]: [],
      });
    }
    console.log(waterArray);
  };

  const handleDropdownChange = (event, { value }) => {
    setShipType(value);
  };
  const handleOrientationChange = (event, { value }) => {
    setOrientation(value);
  };
  return (
    <ContentWrapper>
      <Board
        handleOptions={handleInitialOptions}
        selectedOptions={selectedShipType}
        shipType={shipType}
        orientation={orientation}
      />
      <StyledInputContainer>
        <section>
          <Input handleChange={handleUserChange} label={"Player Name"} />
          <Dropdown handleChange={handleDropdownChange} />
          <Checkbox
            handleChange={handleOrientationChange}
            value={orientation}
          />
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
