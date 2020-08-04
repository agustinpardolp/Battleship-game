import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { letterColumns, numberRows } from "../../utils/constants";

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

    th {
      width: 1.5rem;
      height: 2rem;
    }
    td {
      border: solid 1px black;
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
`;

const Board = ({ handleOptions, totalValues, orientation, shipType }) => {
  return (
    <MainContainer>
      <StyledMainSquare>
        <table>
          <thead>
            <th></th>
            {letterColumns.map((letter, i) => {
              return (
                <th>
                  <span>{letter.name}</span>
                </th>
              );
            })}
          </thead>
          <tbody>
            {numberRows.map((number, numberIndex) => {
              return (
                <tr>
                  {number.name}
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
                    };
                    let cellValues =
                      orientation === "horizontal"
                        ? { index: letterIndex, data: number }
                        : { index: numberIndex, data: letter };

                    return (
                      <StyledTD
                        active={
                          totalValues && totalValues.indexOf(value.name) !== -1
                            ? "blue"
                            : null
                        }
                        onClick={() => {
                          let{index, data} = cellValues
                          handleOptions && handleOptions(index,data, value.name, shipType);
                        }}
                      >
                        <span></span>
                      </StyledTD>
                    );
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
Board.defaultProps = {
  orientation: "vertical",
};
Board.propTypes = {
  handleOptions: PropTypes.func,
  totalValues: PropTypes.array.isRequired,
  orientation: PropTypes.string,
  shipType:PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Board);
