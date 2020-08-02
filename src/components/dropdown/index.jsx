import React from "react";
import { Dropdown as DropDowns } from "semantic-ui-react";

const stateOptions = [
  { key: 1, text: "Carrier", value: 4 },
  { key: 2, text: "Cruisers", value: 3 },
  { key: 3, text: "Cruisers", value: 3 },
  { key: 4, text: "Cruisers", value: 3 },
  { key: 5, text: "Submarine", value: 2 },
];

const Dropdown = () => (
  <DropDowns placeholder="Select a Ship" 
  fluid
  selection
//   search
  wrapSelection={false}
  options={stateOptions}/>

);

export default Dropdown;
