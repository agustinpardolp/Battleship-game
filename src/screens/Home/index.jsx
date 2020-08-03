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
  let [selectedShipType, setSelectedShipType] = useState({
    "Cruisers-1": [],
    "Cruisers-2": [],
    "Cruisers-3": [],
    Submarine: [],
    Carrier: [],
  });
  let [borderFromSelectedShip, setBorderFromSelectedShip] = useState({
    "Cruisers-1": [],
    "Cruisers-2": [],
    "Cruisers-3": [],
    Submarine: [],
    Carrier: [],
  });

  let [shipType, setShipType] = useState("");
  let [orientation, setOrientation] = useState("vertical");

  const handleUserChange = (e) => {
    // console.log(e);
  };

  const handleInitialOptions = (
    cellValue,
    borderValues,
    totalBorderShipValues
  ) => {
    if (cellValue && !selectedShipType[shipType.name].length) {
      if (
        totalBorderShipValues.find(
          (element) =>
            element === cellValue[0] ||
            element === cellValue[cellValue.length - 1]
        ) === undefined
      ) {
        setSelectedShipType({
          ...selectedShipType,
          [shipType.name]: cellValue,
        });
        setBorderFromSelectedShip({
          ...borderFromSelectedShip,
          [shipType.name]: borderValues,
        });
      }
    } else {
      setSelectedShipType({
        ...selectedShipType,
        [shipType.name]: [],
      });
      setBorderFromSelectedShip({
        ...borderFromSelectedShip,
        [shipType.name]: [],
      });
    }
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
        shipBorder={borderFromSelectedShip}
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
