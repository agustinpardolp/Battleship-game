/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

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

const letterColumns = [
  {
    name: "A",
    position: 0,
    prevValue: null,
    nextValue: "B",
  },
  {
    name: "B",
    position: 1,
    prevValue: "A",
    nextValue: "C",
  },
  {
    name: "C",
    position: 2,
    prevValue: "B",
    nextValue: "D",
  },
  {
    name: "D",
    position: 3,
    prevValue: "C",
    nextValue: "E",
  },
  {
    name: "E",
    position: 4,
    prevValue: "D",
    nextValue: "F",
  },
  {
    name: "F",
    position: 5,
    prevValue: "E",
    nextValue: "G",
  },
  {
    name: "G",
    position: 6,
    prevValue: "F",
    nextValue: "H",
  },
  {
    name: "H",
    position: 7,
    prevValue: "G",
    nextValue: "I",
  },
  {
    name: "I",
    position: 8,
    prevValue: "H",
    nextValue: "J",
  },
  {
    name: "J",
    position: 9,
    prevValue: "I",
    nextValue: null,
  },
];
const numberRows = [
  {
    name: 1,
    position: 0,
    prevValue: null,
    nextValue: 2,
  },
  {
    name: 2,
    position: 1,
    prevValue: 1,
    nextValue: 3,
  },
  {
    name: 3,
    position: 2,
    prevValue: 2,
    nextValue: 4,
  },
  {
    name: 4,
    position: 3,
    prevValue: 3,
    nextValue: 5,
  },
  {
    name: 5,
    position: 4,
    prevValue: 4,
    nextValue: 6,
  },
  {
    name: 6,
    position: 5,
    prevValue: 5,
    nextValue: 7,
  },
  {
    name: 7,
    position: 6,
    prevValue: 6,
    nextValue: 8,
  },

  {
    name: 8,
    position: 7,
    prevValue: 7,
    nextValue: 9,
  },
  {
    name: 9,
    position: 8,
    prevValue: 8,
    nextValue: 10,
  },
  {
    name: 10,
    position: 9,
    prevValue: 9,
    nextValue: null,
  },
];

const Board = ({
  handleOptions,
  selectedOptions,
  orientation,
  shipType,
  shipBorder,
}) => {
  let selectedShips = Object.values(selectedOptions);
  let selectedBorderShips = Object.values(shipBorder);
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

  const handlerSelectedShip = ({ index, data }) => {
    let values =
      orientation === "vertical"
        ? numberRows.slice(index, index + shipType.length)
        : letterColumns.slice(index, index + shipType.length);

    if (values.length >= shipType.length) {
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

      return handleOptions(shipArray, borderArray, totalBorderShipValues || []);
    }
  };

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

                    let index =
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
                        value={value}
                        onClick={() => {
                          handlerSelectedShip(index);
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

export default connect(mapStateToProps)(Board);

// const letterColumns = [
//   {
//     name: "A",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 0,
//     prevLetter: null,
//     nextLetter: "B",
//   },
//   {
//     name: "B",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 1,
//     prevLetter: "A",
//     nextLetter: "C",
//   },
//   {
//     name: "C",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 2,
//     prevLetter: "B",
//     nextLetter: "D",
//   },
//   {
//     name: "D",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 3,
//     prevLetter: "C",
//     nextLetter: "E",
//   },
//   {
//     name: "E",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 4,
//     prevLetter: "D",
//     nextLetter: "F",
//   },
//   {
//     name: "F",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 5,
//     prevLetter: "E",
//     nextLetter: "G",
//   },
//   {
//     name: "G",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 6,
//     prevLetter: "F",
//     nextLetter: "H",
//   },
//   {
//     name: "H",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 7,
//     prevLetter: "G",
//     nextLetter: "I",
//   },
//   {
//     name: "I",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 8,
//     prevLetter: "H",
//     nextLetter: "J",
//   },
//   {
//     name: "J",
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 9,
//     prevLetter: "I",
//     nextLetter: null,
//   },
// ];
// const numberRows = [
//   {
//     name: 1,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 0,
//     prevNumber: null,
//     nextNumer: (name) => this.name + 1,
//   },
//   {
//     name: 2,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 1,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: (name) => this.name + 1,
//   },
//   {
//     name: 3,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 2,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: (name) => this.name + 1,
//   },
//   {
//     name: 4,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 3,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: (name) => this.name + 1,
//   },
//   {
//     name: 5,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 4,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: (name) => this.name + 1,
//   },
//   {
//     name: 6,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 5,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: (name) => this.name + 1,
//   },
//   {
//     name: 7,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 6,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: (name) => this.name + 1,
//   },

//   {
//     name: 8,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 7,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: (name) => this.name + 1,
//   },
//   {
//     name: 9,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 8,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: (name) => this.name + 1,
//   },
//   {
//     name: 10,
//     cellMarked: false,
//     cellTouched: false,
//     cellDetroyed: false,
//     position: 9,
//     prevNumber: (name) => this.name - 1,
//     nextNumer: null,
//   },
// ];
