import React, { useState} from "react";
import { connect } from "react-redux";
import { letterColumns, numberRows, shipOptions, colors, labels } from "../../utils/constants";
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

  let [selectedShipType, setSelectedShipType] = useState({ //IMP: the ideal and the right way to do this is to separate the states; it would be necessary a refactor in the future.
    "Cruisers-1": [],
    "Cruisers-2": [],
    "Cruisers-3": [],
    Submarine: [],
    Carrier: [],
    total: [],
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
  let [boardValues, setBoardValues] = useState([]);
  let [orientation, setOrientation] = useState("vertical");

  let selectedShips = Object.values(selectedShipType);
  let selectedBorderShips = Object.values(borderFromSelectedShip);

  let totalValues = [
    ...selectedShips[0],
    ...selectedShips[1],
    ...selectedShips[2],
    ...selectedShips[3],
    ...selectedShips[4],
  ];

  let totalBorderShipValues = [
    ...selectedBorderShips[0],
    ...selectedBorderShips[1],
    ...selectedBorderShips[2],
    ...selectedBorderShips[3],
    ...selectedBorderShips[4],
  ];
  const valuesShipArrayCreator = (values, orientation, data, color) => {

    let shipArray = [];
    let borderArray = [];

    values.forEach((value) => {
      if (orientation === "vertical") {
        shipArray.push({
          name: `${data.name}${value.name}`,
          marked: false,
          isSelected:true,
          color: `${color?color:colors.grey}`,
          prevValue: [
            `${data.name}${value.prevValue}`,
            `${data.prevValue}${value.name}`,
          ],
          nextValue: [
            `${data.nextValue}${value.name}`,
            `${data.name}${value.nextValue}`,
          ],
          orientation: orientation
        });
        borderArray.push(
          {
            name: `${data.nextValue}${value.name}`,
            marked: false,
            isSelected:false,
            color: colors.grey,
          },
          {
            name: `${data.prevValue}${value.name}`,
            marked: false,
            isSelected:false,
            color: colors.grey,
          }
        );
      } else {
        shipArray.push({
          name: `${value.name}${data.name}`,
          marked: false,
          isSelected:true,
          color: `${color?color:colors.grey}`,
          prevValue: [
            `${value.prevValue}${data.name}`,
            `${value.name}${data.prevValue}`,
          ],
          nextValue: [
            `${value.nextValue}${data.name}`,
            `${value.name}${data.nextValue}`,
          ],
          orientation: orientation
        });
        borderArray.push(
          {
            name: `${value.name}${data.nextValue}`,
            marked: false,
            isSelected:false,
            color: colors.grey,
          },
          {
            name: `${value.name}${data.prevValue}`,
            marked: false,
            isSelected:false,
            color: colors.grey,
          }
        );
      }
    });
    return { shipArray, borderArray };
  };

  const borderShipArrayCreator = (borderArray, values, data, orientation) => { //create "border water array"
    if (orientation === "horizontal") {
      return (borderArray = [
        ...borderArray,
        {
          name: `${values[0].prevValue}${data.name}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${values[values.length - 1].nextValue}${data.name}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${values[0].prevValue}${data.nextValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${values[0].prevValue}${data.prevValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${values[values.length - 1].nextValue}${data.nextValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${values[values.length - 1].nextValue}${data.prevValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
      ]);
    } else {
      return (borderArray = [
        ...borderArray,
        {
          name: `${data.name}${values[0].prevValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${data.name}${values[values.length - 1].nextValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${data.nextValue}${values[0].prevValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${data.prevValue}${values[0].prevValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${data.nextValue}${values[values.length - 1].nextValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
        {
          name: `${data.prevValue}${values[values.length - 1].nextValue}`,
          marked: false,
          isSelected:false,
          color: colors.grey,
        },
      ]);
    }
  };

  const shipAroundChecker = (totalBorderShipValues, shipArray) => { // chek if the selected option exist in the "water/border array"
    return totalBorderShipValues.find(
      (element) =>
        element.name === shipArray[0].name ||
        element.name === shipArray[shipArray.length - 1].name
    );
  };
  const handleCPUInitialValues = (
    shipOptions,
    numbers,
    letters,
    acumValues = [],
    acumBorderValues = [],
    counter = 0,
    acumNumbersArray,
    isHorizontal
  ) => {
    let isVertical = isHorizontal ? isHorizontal : false;
    let orientation = isVertical ? "horizontal" : "vertical";
    let localCopyNumberRows = numbers || numberRows.slice();
    let localCopyletterColumns = letters || letterColumns.slice();
    let totalBorderShipValues = acumBorderValues || [];
    let localTotalValues = acumValues || [];
    let shipOptionsCopy = [];
    let numbersArray = acumNumbersArray || [0, 1, 2, 3, 4, 5, 6];
    let notSelectedNumberRows = numbers || [];
    let notSelectedLetterColumns = letters || [];
    counter = counter + 1;

    let shipLocalState = {  //localObjet to save the ships values
      "Cruisers-1": [],
      "Cruisers-2": [],
      "Cruisers-3": [],
      Submarine: [],
      Carrier: [],
    };

    let borderLocalState = {  //localObjet to save the border values
      "Cruisers-1": [],
      "Cruisers-2": [],
      "Cruisers-3": [],
      Submarine: [],
      Carrier: [],
    };

    numbersArray = numbersArray.sort(function () {
      return Math.random() - 0.3;
    });

    for (let i = 0; i < shipOptions.length; i++) { // for each shipOptins ((cruiser X3, carrier, submarine))
      isVertical = !isVertical;
      let randomNumber = numbersArray[i];
      let number = localCopyNumberRows[randomNumber];
      let letter = localCopyletterColumns[randomNumber];

      let cpuCellValues = {};

      if (orientation === "vertical") {  
        cpuCellValues = {
          index: counter + 1,
          data: letter,
        };
      } else {
        cpuCellValues = {
          index: counter + 1,
          data: number,
        };
      }

      let { index, data } = cpuCellValues;
      let values =    //select the cpuCellValues
        orientation === "vertical" && localCopyNumberRows.length
          ? localCopyNumberRows.slice(
              index,
              index + shipOptions[i].value.length
            )
          : localCopyletterColumns.slice(
              index,
              index + shipOptions[i].value.length
            );

      if (values.length >= shipOptions[i].value.length) {
        let { shipArray, borderArray } = valuesShipArrayCreator(  //create the ship cells...
          values,
          orientation,
          data
        );

        borderArray = borderShipArrayCreator( //save the border ship cells... (those are the "water" options around each cell)
          borderArray,
          values,
          data,
          orientation
        );
        if (!shipLocalState[shipOptions[i].value.name].length) { //if the shipOption in the local option is available...
          let shipsAround = shipAroundChecker(totalBorderShipValues, shipArray); //check is the selected is not a "water option"...
          if (shipsAround === undefined) {
            totalBorderShipValues = [
              ...totalBorderShipValues,
              ...borderArray,
              ...shipArray,
            ];
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
            let value;

            if (orientation === "vertical") {
              value = localCopyNumberRows.filter(
                (numberRow) =>
                  !values.find(
                    ({ name, prevValue, nextValue }) =>
                      numberRow.name === name &&
                      numberRow.nextValue === nextValue &&
                      numberRow.prevValue === prevValue
                  )
              );
              notSelectedNumberRows = [...notSelectedNumberRows, ...value];
            } else {
              value = localCopyletterColumns.filter(
                (letterCol) =>
                  !values.find(
                    ({ name, prevValue, nextValue }) =>
                      letterCol.name === name &&
                      letterCol.nextValue === nextValue &&
                      letterCol.prevValue === prevValue
                  )
              );
              notSelectedLetterColumns = [
                ...notSelectedLetterColumns,
                ...value,
              ];
            }
          } else {
            shipOptionsCopy = [...shipOptionsCopy, shipOptions[i]]; //update a local copy of the ship options for the recursion...
          }
        }
      } else {
        shipOptionsCopy = [...shipOptionsCopy, shipOptions[i]]; //update a local copy of the ship options for the recursion..
      }
      if (counter >= 8) { // in case the recursion takes at least 8 rounds, the ship position will be defined manually...
        let availableValues = boardValues.filter(
          (element) => acumBorderValues.indexOf(element) === -1
        );
        let values = availableValues.slice(0, shipOptions[i].value.length);
        let shipArray = values.map((value) => {
          return {
            name: value,
            marked: false,
            isSelected:false,
            color: colors.grey,
          };
        });
        localTotalValues = [...localTotalValues, ...shipArray];
      }
    }
    numbersArray.splice(5, numbersArray.length - 1);

    isVertical = !isVertical;

    if (localTotalValues.length < 15) {
      return handleCPUInitialValues( //recursive function until the CPU values are complete
        shipOptionsCopy,
        notSelectedNumberRows,
        notSelectedLetterColumns,
        localTotalValues,
        totalBorderShipValues,
        counter,
        numbersArray,
        isVertical
      );
    } else return localTotalValues;
  };

  const handleUserInitialValues = (index, data, _valueName, shipType) => {
    let values =
      orientation === "vertical"
        ? numberRows.slice(index, index + shipType.length)
        : letterColumns.slice(index, index + shipType.length);

    if (shipType.length && values.length >= shipType.length) {
      let { shipArray, borderArray } = valuesShipArrayCreator(
        values,
        orientation,
        data,
        colors.green
      );
      borderArray = borderShipArrayCreator(
        borderArray,
        values,
        data,
        orientation
      );

      return handleSaveUserOptionsLocally(
        shipArray,
        borderArray,
        totalBorderShipValues,
        shipType
      );
    }
  };

  const handleSaveUserOptionsLocally = (
    cellValue,
    borderValues,
    totalBorderShipValues,
    shipType
  ) => {
    if (cellValue && !selectedShipType[shipType.name].length) {
      if (
        totalBorderShipValues.find(
          (element) =>
            element.name === cellValue[0].name ||
            element.name === cellValue[cellValue.length - 1].name
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

  const handleDropdownChange = (_event, { value }) => {
    setShipType(value);
  };
  const handleOrientationChange = (_event, { value }) => {
    setOrientation(value);
  };
  const handleStatus = () => { //to prevent start the game whitout all the fiels completed
    // if (totalValues.length === 15 && userName.length) return false;
    // else return true;
  };
  const handleUserChange = (e) => {
    setUserName(e.target.value);
  };

  const onConfirmUserOptions = () => {
    let values = handleCPUInitialValues(shipOptions, numberRows, letterColumns);
    setInitialUserGameOption(selectedShipType, totalValues, userName); //set userOptions on redux store
    setInitialCPUGameOption(values);//set cpuOptions on redux store
    history.push("/game");
  };

  const getTotalBoard = (value) => {
    setBoardValues(value);
  };

  return (
    <ContentWrapper>
      <Board
        handleOptions={handleUserInitialValues}
        selectedValues={totalValues}
        shipBorder={borderFromSelectedShip}
        shipType={shipType}
        orientation={orientation}
        getTotalBoard={getTotalBoard}
      />
      <StyledInputContainer>
        <section>
          <Input handleChange={handleUserChange} label={labels.input} />
          <Dropdown
            handleChange={handleDropdownChange}
            selectedShipType={selectedShipType}
          />
          <Checkbox
            handleChange={handleOrientationChange}
            value={orientation}
          />
          <Button
            content= {labels.buttonStart}
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

const mapDispatchToProps = {
  setInitialCPUGameOption,
  setInitialUserGameOption,
};

export default connect(null, mapDispatchToProps)(Home);
