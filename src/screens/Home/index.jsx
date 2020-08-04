import React, { useState } from "react";
import { connect } from "react-redux";
import { letterColumns, numberRows, shipOptions } from "../../utils/constants";
import Board from "../../components/board";
import ContentWrapper from "../../components/contentWrapper";
import Input from "../../components/input";
import Button from "../../components/button";

import styled from "styled-components";
import {
  setInitialUserGameOption,
  setInitialCPUGameOption,
} from "../../redux/actions/";
import Dropdown from "../../components/dropdown";
import Checkbox from "../../components/checkBox";

const StyledInputContainer = styled.div`
  display: grid;
  height: 100%;
  align-items: center;
  & section:first-child {
    display: grid;
    grid-template-rows: 20% 15% 20% 20% 25%;
    align-items: center;
    height: 100%;
  }
`;
const Home = ({
  setInitialUserGameOption,
  history,
  setInitialCPUGameOption,
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
  let [userName, setUserName] = useState("");
  let [shipType, setShipType] = useState("");

  let [orientation, setOrientation] = useState("vertical");

  let selectedShips = Object.values(selectedShipType);
  let totalValues = [
    ...selectedShips[0],
    ...selectedShips[1],
    ...selectedShips[2],
    ...selectedShips[3],
    ...selectedShips[4],
  ];

  let selectedBorderShips = Object.values(borderFromSelectedShip);

  let totalBorderShipValues = [
    ...selectedBorderShips[0],
    ...selectedBorderShips[1],
    ...selectedBorderShips[2],
    ...selectedBorderShips[3],
    ...selectedBorderShips[4],
  ];
  const valuesShipArrayCreator = (
    values,
    orientation,
    orientationIndex,
    data
  ) => {
    let shipArray = [];
    let borderArray = [];

    values.forEach((value) => {
      if (orientation[orientationIndex] === "vertical") {
        shipArray.push(`${data.name}${value.name}`);
        borderArray.push(
          `${data.nextValue}${value.name}`,
          `${data.prevValue}${value.name}`
        );
      } else {
        shipArray.push(`${value.name}${data.name}`);
        borderArray.push(
          `${value.name}${data.nextValue}`,
          `${value.name}${data.prevValue}`
        );
      }
    });
    return { shipArray, borderArray };
  };

  const borderShipArrayCreator = (borderArray, values, data) => {
    if (orientation === "horizontal") {
      return (borderArray = [
        ...borderArray,
        `${values[0].prevValue}${data.name}`,
        `${values[values.length - 1].nextValue}${data.name}`,
        `${values[0].prevValue}${data.nextValue}`,
        `${values[0].prevValue}${data.prevValue}`,
        `${values[values.length - 1].nextValue}${data.nextValue}`,
        `${values[values.length - 1].nextValue}${data.prevValue}`,
      ]);
    } else {
      return (borderArray = [
        ...borderArray,
        `${data.name}${values[0].prevValue}`,
        `${data.name}${values[values.length - 1].nextValue}`,
        `${data.nextValue}${values[0].prevValue}`,
        `${data.prevValue}${values[0].prevValue}`,
        `${data.nextValue}${values[values.length - 1].nextValue}`,
        `${data.prevValue}${values[values.length - 1].nextValue}`,
      ]);
    }
  };
  const setCPUInitialValues = () => {
    let orientation = ["horizontal", "vertical"];
    let shipLocalState = {
      "Cruisers-1": [],
      "Cruisers-2": [],
      "Cruisers-3": [],
      Submarine: [],
      Carrier: [],
    };

    let borderLocalState = {
      "Cruisers-1": [],
      "Cruisers-2": [],
      "Cruisers-3": [],
      Submarine: [],
      Carrier: [],
    };
    let totalBorderShipValues = [];
    let localTotalValues = [];

    for (let i = 0; i < shipOptions.length; i++) {
      let randomNumber = Math.floor(Math.random() * (9 - 0)) + 0;
      let letterIndex = randomNumber;
      let numberIndex = randomNumber;
      let number = numberRows[randomNumber];
      let letter = letterColumns[randomNumber];
      let orientationIndex = Math.floor(Math.random() * (3 - 1) + 0);

      let cpuCellValues =
        orientation[orientationIndex] === "vertical"
          ? { index: letterIndex, data: letter }
          : { index: numberIndex, data: number };

      let { index, data } = cpuCellValues;

      let values =
        orientation[orientationIndex] === "vertical"
          ? numberRows.slice(index, index + shipOptions[i].value.length)
          : letterColumns.slice(index, index + shipOptions[i].value.length);

      if (
        shipOptions[i].value.length &&
        values.length >= shipOptions[i].value.length
      ) {
        let { shipArray, borderArray } = valuesShipArrayCreator(
          values,
          orientation,
          orientationIndex,
          data
        );
        borderArray = borderShipArrayCreator(borderArray, values, data);

        if (shipArray && !shipLocalState[shipOptions[i].value.name].length) {
          if (
            totalBorderShipValues.find(
              (element) =>
                element === shipArray[0] ||
                element === shipArray[shipArray.length - 1]
            ) === undefined
          ) {
            shipLocalState = {
              ...shipLocalState,
              [shipOptions[i].value.name]: shipArray,
            };
            borderLocalState = {
              ...borderLocalState,
              [shipOptions[i].value.name]: borderArray,
            };

            localTotalValues = [...localTotalValues, ...shipArray];

            totalBorderShipValues = [
              ...totalBorderShipValues,
              ...borderArray,
              ...shipArray,
            ];
          } 
          
        //   else {
        //     do
        //       valuesShipArrayCreator(
        //         values,
        //         orientation,
        //         orientationIndex,
        //         data
        //       );
        //     while (
        //       totalBorderShipValues.find(
        //         (element) =>
        //           element === shipArray[0] ||
        //           element === shipArray[shipArray.length - 1]
        //       ) === undefined
        //     );
        //   }
        }
      }
    }
    for(let element in shipLocalState){
      if (!element.value.length){
        
      }
    }
    return localTotalValues;
  };

  const handlerSelectedShip = (index, data, valueName, shipType) => {
    let values =
      orientation === "vertical"
        ? numberRows.slice(index, index + shipType.length)
        : letterColumns.slice(index, index + shipType.length);

    if (shipType.length && values.length >= shipType.length) {
      let shipArray = [];
      let borderArray = [];

      values.forEach((value) => {
        if (orientation === "vertical") {
          shipArray.push(`${data.name}${value.name}`);
          borderArray.push(
            `${data.nextValue}${value.name}`,
            `${data.prevValue}${value.name}`
          );
        } else {
          shipArray.push(`${value.name}${data.name}`);
          borderArray.push(
            `${value.name}${data.nextValue}`,
            `${value.name}${data.prevValue}`
          );
        }
      });

      if (orientation === "horizontal") {
        borderArray = [
          ...borderArray,
          `${values[0].prevValue}${data.name}`,
          `${values[values.length - 1].nextValue}${data.name}`,
          `${values[0].prevValue}${data.nextValue}`,
          `${values[0].prevValue}${data.prevValue}`,
          `${values[values.length - 1].nextValue}${data.nextValue}`,
          `${values[values.length - 1].nextValue}${data.prevValue}`,
        ];
      } else {
        borderArray = [
          ...borderArray,
          `${data.name}${values[0].prevValue}`,
          `${data.name}${values[values.length - 1].nextValue}`,
          `${data.nextValue}${values[0].prevValue}`,
          `${data.prevValue}${values[0].prevValue}`,
          `${data.nextValue}${values[values.length - 1].nextValue}`,
          `${data.prevValue}${values[values.length - 1].nextValue}`,
        ];
      }

      return handleInitialOptions(
        shipArray,
        borderArray,
        totalBorderShipValues,
        shipType
      );
    }
  };

  const handleInitialOptions = (
    cellValue,
    borderValues,
    totalBorderShipValues,
    shipType
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
  const handleStatus = () => {
    // if (totalValues.length === 15 && userName.length) return false;
    // else return true;
  };
  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };

  const onConfirmUserOptions = () => {
    let values = setCPUInitialValues();

    // setInitialUserGameOption(selectedShipType, totalValues, userName);
    setInitialCPUGameOption(values);
    history.push("/game");
  };

  return (
    <ContentWrapper>
      <Board
        handleOptions={handlerSelectedShip}
        totalValues={totalValues}
        shipBorder={borderFromSelectedShip}
        shipType={shipType}
        orientation={orientation}
      />
      <StyledInputContainer>
        <section>
          <Input handleChange={handleUserChange} label={"Player Name"} />
          <Dropdown
            handleChange={handleDropdownChange}
            selectedShipType={selectedShipType}
          />
          <Checkbox
            handleChange={handleOrientationChange}
            value={orientation}
          />
          <Button
            content="Start Game"
            disabled={handleStatus()}
            onClick={onConfirmUserOptions}
            iconType="right arrow"
            inverted={true}
          />
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
  setInitialCPUGameOption,
  setInitialUserGameOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
