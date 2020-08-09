import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
  userSelection,
  boardValues,
  cpuBoardValues,
  setCpuBoardValues,
}) => {
  let [showModal, setShowModal] = useState(false);
  let [message, setMessage] = useState("");
  let [playersTurn, setPlayersTurn] = useState(false);
  let [cpuTurns, setCpuTurns] = useState(true);
  let [userShipTouched, setUserShipTouched] = useState({
    successful: [],
    failed: [],
    posibleValues: [],
  });

  const handleCpuSelection = () => {
    let exist = false;
    let localBoardValues =
      cpuBoardValues && cpuBoardValues.length
        ? cpuBoardValues
        : boardValues.slice();
    let position = Math.floor(Math.random() * localBoardValues.length - 1 + 1);
    let cpuSelection = localBoardValues[position];
    let posibleValues = []

    if (userShipTouched.successful.length) {
      posibleValues =
        userShipTouched.posibleValues && userShipTouched.posibleValues.length
          ? userShipTouched.posibleValues.slice()
          : [
              ...userShipTouched.successful[
                userShipTouched.successful.length - 1
              ].nextValue,
              ...userShipTouched.successful[
                userShipTouched.successful.length - 1
              ].prevValue,
            ];
      posibleValues = posibleValues.filter((value) => !value.includes("null"));
      console.log("POSIBLEVALUES DEL HAY SUCCES ARRAY", posibleValues);
      setUserShipTouched({
        ...userShipTouched,
        posibleValues: posibleValues,
      });

      debugger;

      cpuSelection = {
        name: posibleValues[0],
        marked: true,
        isSelected: true,
        color: "grey",
      };
    }
    let tempInitialUserValues =
      initialUserTotalValues &&
      initialUserTotalValues.map((value) => {
        if (value.name === cpuSelection.name) {
          exist = true;
          debugger;

          setSelectedCPUGameOption(cpuSelection);
          setUserShipTouched({
            ...userShipTouched,
            successful: [...userShipTouched.successful, value],
            posibleValues: [],
          });
          debugger;
          console.log(userShipTouched);

          debugger;

          return (value = {
            name: value.name,
            marked: true,
            isSelected: true,
            color: "yellow",
            prevValue: value.prevValue,
            nextValue: value.nextValue,
          });
        } else return value;
      });

    if (!exist) {
      console.log(cpuSelection);
      console.log(
        "POSIBLEVALUES DEL HAY SUCCES ARRAY",
        userShipTouched.posibleValues
      );
      tempInitialUserValues = [
        ...tempInitialUserValues,
        ...[
          {
            name: cpuSelection.name,
            marked: true,
            isSelected: true,
            color: "blue",
          },
        ],  
      ];
      posibleValues.length  &&  posibleValues.shift();
     console.log(posibleValues)
      setUserShipTouched({
        ...userShipTouched,
        failed: [...userShipTouched.failed, cpuSelection],
        posibleValues: posibleValues,
      });
    }

    if (cpuSelection && cpuSelection.length >= 15) {
      setShowModal(!showModal);
      setMessage("Felicitaciones, Ganaste!");
      setInitialCPUGameOption([]);
    }
    localBoardValues.splice(position, 1);
    setCpuBoardValues(localBoardValues);
    setInitialUserGameOption(
      initialUserValues,
      tempInitialUserValues,
      userName
    );
    setPlayersTurn(false);
    // setCpuTurns(!cpuTurns);
  };

  useEffect(() => {
    return () => {
      setInitialCPUGameOption([]);
    };
  }, [setInitialCPUGameOption]);

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
            color: "yellow",
          });
        } else return value;
      });

    if (!exist) {
      tempInitialCpuValues = [
        ...tempInitialCpuValues,
        ...[{ name: args[4].name, marked: true, color: "blue" }],
      ];
    }

    setInitialCPUGameOption(tempInitialCpuValues);
    if (userSelection.length >= 15) {
      setShowModal(!showModal);
      setMessage("Felicitaciones, Ganaste!");
    }
    setPlayersTurn(!playersTurn);
    handleCpuSelection();
  };

  // let checkCpuSelectionInUserOptions = (initialUserValues, userShipTouched )=>{
  //   for(let userOptions in initialUserValues){
  //     userOptions.filter((value)=>userShipTouched.find(item =>item.name !== value.name))
  //   }
  // }

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
  let { cpuSelection } = state.CPUGameOption;
  let { initialCpuValues } = state.CpuInitialGameOption;
  let { boardValues } = state.BoardValues;
  let { cpuBoardValues } = state.CpuBoardValues;
  return {
    initialUserValues,
    initialUserTotalValues,
    initialCpuValues,
    userName,
    userSelection,
    cpuSelection,
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
};

Game.defaultProps = {
  orientation: "vertical",
};
Game.propTypes = {
  setSelectedUserGameOption: PropTypes.func.isRequired,
  handleOptions: PropTypes.func.isRequired,
  totalValues: PropTypes.array.isRequired,
  userName: PropTypes.string,
  boardValues: PropTypes.array.isRequired,
  CpuBoardValues: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
