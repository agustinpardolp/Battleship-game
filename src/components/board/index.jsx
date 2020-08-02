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
    prevLetter: null,
    nextLetter: "B",
  },
  {
    name: "B",
    position: 1,
    prevLetter: "A",
    nextLetter: "C",
  },
  {
    name: "C",
    position: 2,
    prevLetter: "B",
    nextLetter: "D",
  },
  {
    name: "D",
    position: 3,
    prevLetter: "C",
    nextLetter: "E",
  },
  {
    name: "E",
    position: 4,
    prevLetter: "D",
    nextLetter: "F",
  },
  {
    name: "F",
    position: 5,
    prevLetter: "E",
    nextLetter: "G",
  },
  {
    name: "G",
    position: 6,
    prevLetter: "F",
    nextLetter: "H",
  },
  {
    name: "H",
    position: 7,
    prevLetter: "G",
    nextLetter: "I",
  },
  {
    name: "I",
    position: 8,
    prevLetter: "H",
    nextLetter: "J",
  },
  {
    name: "J",
    position: 9,
    prevLetter: "I",
    nextLetter: null,
  },
];
const numberRows = [
  {
    name: 1,
    position: 0,
    prevNumber: null,
    nextNumber: 2,
  },
  {
    name: 2,
    position: 1,
    prevNumber: 1,
    nextNumber: 3,
  },
  {
    name: 3,
    position: 2,
    prevNumber: 2,
    nextNumber: 4,
  },
  {
    name: 4,
    position: 3,
    prevNumber: 3,
    nextNumber: 5,
  },
  {
    name: 5,
    position: 4,
    prevNumber: 4,
    nextNumber: 6,
  },
  {
    name: 6,
    position: 5,
    prevNumber: 5,
    nextNumber: 7,
  },
  {
    name: 7,
    position: 6,
    prevNumber: 6,
    nextNumber: 8,
  },

  {
    name: 8,
    position: 7,
    prevNumber: 7,
    nextNumber: 9,
  },
  {
    name: 9,
    position: 8,
    prevNumber: 8,
    nextNumber: 10,
  },
  {
    name: 10,
    position: 9,
    prevNumber: 9,
    nextNumber: null,
  },
];

const Board = ({ handleOptions, selectedOptions }) => {
  let [selectedValue, setSelectedValue] = useState("");
  const boardData = []

  const handleSelectValue = (value) => {
    setSelectedValue(value);
  };
  console.log("BOARDA", boardData)
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
            {numberRows.map((number) => {
              return (
                <tr>
                  {number.name}
                  {letterColumns.map((letter, i) => {
                  
                    let value = {
                      name: `${letter.name}${number.name}`,
                      positionValue: [`${letter.name}`, number.name],
                      prevValue: [
                        `${letter.prevLetter}${number.name}`,
                        `${letter.name}${number.prevNumber}`,
                      ],
                      nextValue: [
                        `${letter.nextLetter}${number.name}`,
                        `${letter.name}${number.nextNumber}`,
                      ],
                    };
                    boardData.push(value)
                    // debugger;
                    return (
                      <StyledTD
                        active={
                          selectedOptions &&
                          selectedOptions.indexOf(value.name) != -1
                            ? "blue"
                            : null
                        }
                        value={value}
                        onClick={() => {
                          handleOptions(value);
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
