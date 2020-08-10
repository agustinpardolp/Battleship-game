import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { colors, messages } from "../../utils/constants";
import ContentWrapper from "../../components/contentWrapper";
import Board from "../../components/board";
import Modal from "../../components/modal";
import Header from "../../components/header";
import {
  setSelectedUserGameOption,
  setInitialUserGameOption,
  setInitialCPUGameOption,
  setCpuBoardValues,
  setSelectedCPUGameOption,
  resetSelectedUserGameOption,
  resetSelectedCPUGameOption,
} from "../../redux/actions/";

const Game = ({
  userName,
  initialUserValues,
  initialCpuValues,
  initialUserTotalValues,
  setSelectedUserGameOption,
  setInitialCPUGameOption,
  setInitialUserGameOption,
  setSelectedCPUGameOption,
  resetSelectedUserGameOption,
  resetSelectedCPUGameOption,
  userSelection,
  boardValues,
  cpuBoardValues,
  setCpuBoardValues,
  cpuStoreValues,
}) => {
  let [showModal, setShowModal] = useState(false);
  let [message, setMessage] = useState("");
  let [playersTurn, setPlayersTurn] = useState(false);
  let [successfulShot, setSuccessfullShot] = useState([]);
  let [posibleShot, setPosibleShot] = useState([]);
  let [failedShot, setFailedShot] = useState([]);
  let [gameFinished, setGameFinished] = useState(false);

  const randomPosition = (localBoardValues) => {
    // fn to generate a random position
    let position = Math.floor(Math.random() * localBoardValues.length - 1 + 1);
    return { cpuSelection: localBoardValues[position], position };
  };

  const posibleShotsFilter = (failedShot, posibleValues) => {
    //clean the array of posible options, discard the blue one and null cells
    posibleValues = posibleValues.filter((value) => !value.includes("null"));
    let resultado = failedShot.map((value) => value.name);
    posibleValues = posibleValues.filter((value) => !resultado.includes(value));
    return posibleValues;
  };

  const handleCpuSelection = () => {
    // fn to handle the cpu movements
    let exist = false;
    let localBoardValues =
      cpuBoardValues && cpuBoardValues.length
        ? cpuBoardValues
        : boardValues.slice();
    let { cpuSelection, position } = randomPosition(localBoardValues);
    let posibleValues = [];

    if (successfulShot.length) {
      //a)if there are sucfesfullShots...
      posibleValues =
        posibleShot && posibleShot.length //b).. look for the posibles shots in the next and prev values of each cell...
          ? posibleShot.slice()
          : [
              ...successfulShot[successfulShot.length - 1].nextValue,
              ...successfulShot[successfulShot.length - 1].prevValue,
            ];
      posibleValues = posibleShotsFilter(failedShot, posibleValues); //b)..clean the posibleValues

      setPosibleShot([...posibleValues]);
      cpuSelection = {
        //c)redefine the cpuSelection local value to test the first option of the posibleValues Array
        name: posibleValues[0],
        marked: true,
        isSelected: true,
        color: colors.grey,
      };

      position = localBoardValues //d) find the posibleValues position in order to remote it from boardValues and update at the end of the function (line 145)
        .map(function (e) {
          return e.name;
        })
        .indexOf(posibleValues[0]);

      if (successfulShot.length >= 2) {
        // If the CPU has already clicked twice, find the other values ​​in the initialUserValues array
        cpuSelection = checkCpuSelectionInUserOptions(
          initialUserValues,
          successfulShot
        )[0];

        if (!cpuSelection) {
          setSuccessfullShot([]);

          cpuSelection = randomPosition(localBoardValues).cpuSelection; //
          //if there are no possible values ​​left to test, I clean the array and start the loop again whit a random number...
        }
      }
    }
    //the CPU movemments are random, until the CPU hit an user ship..
    let tempInitialUserValues =
      initialUserTotalValues &&
      initialUserTotalValues.map((value) => {
        if (value.name === cpuSelection.name && value.color === colors.green) {
          exist = true;

          setSelectedCPUGameOption(cpuSelection); //update list of succesfull CPU movements
          setSuccessfullShot([...successfulShot, value]); //update a temporal list of succesfull CPU movements
          setPosibleShot([]); //clean the posible shots array

          return (value = {
            name: value.name,
            marked: true,
            isSelected: true,
            color: colors.yellow,
            prevValue: value.prevValue,
            nextValue: value.nextValue,
            orientation: value.orientation,
          });
        } else return value;
      });

    if (!exist) {
      tempInitialUserValues = [
        ...tempInitialUserValues,
        ...[
          {
            name: cpuSelection.name,
            marked: true,
            isSelected: true,
            color: colors.blue,
          },
        ],
      ];
      setFailedShot([...failedShot, cpuSelection]);
    }
    posibleValues.length && posibleValues.shift();
    setPosibleShot(posibleValues);

    if (cpuStoreValues && cpuStoreValues.length === 14) {
      setShowModal(!showModal);
      setMessage(messages.cpuWin);
      setInitialCPUGameOption([]);
      setGameFinished(true);
    }
    localBoardValues.splice(position, 1);

    setCpuBoardValues(localBoardValues);
    setInitialUserGameOption(
      initialUserValues,
      tempInitialUserValues,
      userName
    );
    setPlayersTurn(false);
  };

  useEffect(() => {
    return () => {
      setInitialCPUGameOption([]);
      setInitialCPUGameOption([]);
      resetSelectedUserGameOption();
      resetSelectedCPUGameOption();
      setInitialUserGameOption([]);
      setCpuBoardValues([]);
    };
  }, [
    setInitialCPUGameOption,
    gameFinished,
    setSelectedUserGameOption,
    setInitialUserGameOption,
    setCpuBoardValues,
    setSelectedCPUGameOption,
    resetSelectedUserGameOption,
    resetSelectedCPUGameOption,
  ]);

  const handleUserSelection = (...args) => {
    let exist = false;
    let tempInitialCpuValues =
      initialCpuValues &&
      initialCpuValues.map((value) => {
        if (value.name === args[4].name) {
          exist = true;
          setSelectedUserGameOption(args[4]);

          return (value = {
            name: value.name,
            marked: true,

            isSelected: true,
            color: colors.yellow,
          });
        } else return value;
      });

    if (!exist) {
      tempInitialCpuValues = [
        ...tempInitialCpuValues,
        ...[{ name: args[4].name, marked: true, color: colors.blue }],
      ];
    }

    setInitialCPUGameOption(tempInitialCpuValues);
    if (userSelection.length === 14) {
      setShowModal(!showModal);
      setMessage(messages.userWin);
      setGameFinished(true);
    }
    setPlayersTurn(!playersTurn);
    handleCpuSelection();
  };

  let checkCpuSelectionInUserOptions = (
    //when cpu touches at least two user squares,
    //it uses this fn to find the other positions
    initialUserValues,
    userShipTouchedSuccessful
  ) => {
    let userShipOptions = [];
    for (let userOptions in initialUserValues) {
      let ships = initialUserValues[userOptions].filter((value) =>
        userShipTouchedSuccessful.find((item) => item.name === value.name)
      );
      if (ships.length) {
        userShipOptions = initialUserValues[userOptions];
        break;
      }
    }
    let result = userShipOptions.filter(
      (item) =>
        !userShipTouchedSuccessful.some((other) => item.name === other.name)
    );

    return result;
  };

  return (
    <>
      <Modal setOpen={setShowModal} open={showModal} message={message} />
      <Header userName={userName} />
      <ContentWrapper>
        <Board selectedValues={initialUserTotalValues} />
        <Board
          selectedValues={initialCpuValues}
          handleOptions={handleUserSelection}
          disabled={playersTurn}
        />
      </ContentWrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  let {
    initialUserValues,
    initialUserTotalValues,
    userName,
  } = state.UserInitialGameOption;
  let { userSelection } = state.UserGameOption;
  let { cpuSelection: cpuStoreValues } = state.CPUGameOption;
  let { initialCpuValues } = state.CpuInitialGameOption;
  let { boardValues } = state.BoardValues;
  let { cpuBoardValues } = state.CpuBoardValues;

  return {
    initialUserValues,
    initialUserTotalValues,
    initialCpuValues,
    userName,
    userSelection,
    cpuStoreValues,
    boardValues,
    cpuBoardValues,
  };
};

const mapDispatchToProps = {
  setSelectedUserGameOption,
  setInitialUserGameOption,
  setInitialCPUGameOption,
  setCpuBoardValues,
  setSelectedCPUGameOption,
  resetSelectedUserGameOption,
  resetSelectedCPUGameOption,
};

Game.propTypes = {
  handleOptions: PropTypes.func.isRequired,
  totalValues: PropTypes.array.isRequired,
  boardValues: PropTypes.array.isRequired,
  CpuBoardValues: PropTypes.array.isRequired,
  userName:  PropTypes.string.isRequired,
  initialUserValues: PropTypes.array.isRequired,
  initialCpuValues: PropTypes.array.isRequired,
  initialUserTotalValues: PropTypes.array.isRequired,
  setSelectedUserGameOption: PropTypes.func.isRequired,
  setInitialCPUGameOption:PropTypes.func.isRequired,
  setInitialUserGameOption:PropTypes.func.isRequired,
  setSelectedCPUGameOption:PropTypes.func.isRequired,
  resetSelectedUserGameOption:PropTypes.func.isRequired,
  resetSelectedCPUGameOption:PropTypes.func.isRequired,
  userSelection: PropTypes.array.isRequired,
  cpuBoardValues: PropTypes.array.isRequired,
  setCpuBoardValues :PropTypes.func.isRequired,
  cpuStoreValues: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
