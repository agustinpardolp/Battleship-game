import React, { useState } from "react";
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
  background: ${(props) => props.color};
`;

const letterColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const numberRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Board() {
  let [selectedValue, setSelectedValue] = useState("");
  const handleSelectValue = (value) => {
    setSelectedValue(value);
  };
  return (
    <MainContainer>
      {/* <div>
          {letterColumns.map((letter) => {
            return <span>{letter}</span>;
          })}
        </div> */}
      <StyledMainSquare>
        <table>
          <thead>
            <th></th>
            {letterColumns.map((letter, i) => {
              return (
                <th>
                  <span>{letter}</span>
                </th>
              );
            })}
          </thead>
          <tbody>
            {numberRows.map((number) => {
              return (
                <tr>
                  {number}
                  {letterColumns.map((letter) => {
                    let value = `${letter}${number}`;
                    return (
                      <StyledTD
                        color={selectedValue === value ? "blue" : null}
                        value={value}
                        onClick={() => {
                          handleSelectValue(value);
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
}
