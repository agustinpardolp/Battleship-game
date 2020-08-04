import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContentWrapper from "../../components/contentWrapper";
import Board from "../../components/board";
import Header from "../../components/header";
import { setSelectedUserGameOption } from "../../redux/actions/";

const Game = ({
  userName,
  initialCpuValues,
  initialUserTotalValues,
}) => {
  const handleUserSelection = (index, value) => {

    setSelectedUserGameOption(value);
  };
  const handleCpuSelection = (index, value) => {

  };

  return (
    <>
  <Header userName={userName}/>
    <ContentWrapper>
      <Board  totalValues={initialUserTotalValues} />
      <Board totalValues={initialCpuValues} handleOptions={handleUserSelection} />
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
  let { initialCpuValues } = state.CpuInitialGameOption;
  return {
    initialUserValues,
    initialUserTotalValues,
    initialCpuValues,
    userName,
  };
};

const mapDispatchToProps = {
  setSelectedUserGameOption,
};

Game.defaultProps = {
  orientation: "vertical",
};
Game.propTypes = {
  setSelectedUserGameOption: PropTypes.func.isRequired,
  handleOptions: PropTypes.func.isRequired,
  totalValues: PropTypes.array.isRequired,
  userName: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
