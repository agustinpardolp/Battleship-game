import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { letterColumns, numberRows, colors } from "../../utils/constants";
import { setTotalBoardValues } from "../../redux/actions";

const StyledMainSquare = styled.div`
  background: #c3b7b7;
  padding: 0% 2% 2% 0%;
  width: 90%;
  height: 90%;
  border-right: outset;
  table {
    width: 100%;
    height: 100%;
    display: table;
    border-collapse: collapse;
    background: grey;
    th {
      width: 1.5rem;
      height: 2rem;
    }
  }
`;
const MainContainer = styled.div`
  width: 500px;
  height: 500px;
  & div:first-child {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  & div:nth-child(2) {
    width: 100%;
    background: blue;
    display: flex;
    justify-content: space-around;
  }
`;

const StyledTD = styled.td`
  background: ${(props) => props.active};
  border: solid 1px black;
  cursor: ${(props) => (props.disabled ? "not-allowed" : null)};
  background-color: ${(props) => (props.disabled ? "#ddd" : null)};
`;

const Board = ({
  handleOptions,
  selectedValues,
  orientation,
  shipType,
  getTotalBoard,
  setTotalBoardValues,
  disabled,
}) => {
  const totalBoard = [];
  const boardValues = [];
  useEffect(() => {
    getTotalBoard(totalBoard);
    setTotalBoardValues(boardValues);
  }, []);

  let tdGenerator = (value, cellValues, selectedValues) => {
    let cell =
      selectedValues &&
      selectedValues.find((element) => {
        return element.name === value.name;
      });

    let tdColor = "";
    if (cell) {
      switch (cell.color) {
        case colors.blue:
          tdColor = colors.blue;
          break;
        case colors.green:
          tdColor = colors.green;
          break;
        case colors.yellow:
          tdColor = colors.yellow;
          break;
        default:
          tdColor = colors.grey;
          break;
      }
    }

    return (
      <StyledTD
        key={value.name}
        disabled={disabled}
        active={tdColor}
        onClick={() => {
          let { index, data } = cellValues;

          tdColor !== colors.blue &&
            handleOptions(index, data, value.name, shipType, value);
        }}
      >
        <span></span>
      </StyledTD>
    );
  };

  return (
    <MainContainer>
      <StyledMainSquare>
        <table>
          <thead>
            <tr>
              <th></th>
              {letterColumns.map((letter, i) => {
                return (
                  <th key={letter.name}>
                    <span>{letter.name}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {numberRows.map((number, numberIndex) => {
              return (
                <tr key={number.name}>
                  <th>{number.name}</th>
                  {letterColumns.map((letter, letterIndex) => {
                    let value = {
                      name: `${letter.name}${number.name}`,
                      positionValue: [`${letter.name}`, number.name],
                      prevValue: [
                        `${letter.prevValue}${number.name}`,
                        `${letter.name}${number.prevValue}`,
                      ],
                      nextValue: [
                        `${letter.nextValue}${number.name}`,
                        `${letter.name}${number.nextValue}`,
                      ],
                      color: colors.grey,
                      marked: false,
                      isSelected: false,
                    };
                    let cellValues =
                      orientation === "horizontal"
                        ? { index: letterIndex, data: number }
                        : { index: numberIndex, data: letter };
                    totalBoard.push(value.name);
                    boardValues.push(value);
                    return tdGenerator(value, cellValues, selectedValues);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </StyledMainSquare>
    </MainContainer>
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
  setTotalBoardValues,
};
Board.defaultProps = {
  orientation: "vertical",
  getTotalBoard: () => {},
  disabled: false,
};
Board.propTypes = {
  handleOptions: PropTypes.func,
  selectedValues: PropTypes.array.isRequired,
  orientation: PropTypes.string,
  getTotalBoard:PropTypes.func.isRequired,
  shipType: PropTypes.object.isRequired,
  setTotalBoardValues: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  React.memo(Board), (prevProps, nextProps) => {
    return prevProps.shipType === nextProps.shipType;
  })

