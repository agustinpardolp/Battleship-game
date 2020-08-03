import React from "react";
import { Dropdown as DropDowns } from "semantic-ui-react";

const stateOptions = [
  { key: 1, text: "Carrier", value: { name: "Carrier", length: 4 } },
  { key: 2, text: "Cruisers-1", value: { name: "Cruisers-1", length: 3 } },
  { key: 3, text: "Cruisers-2", value: { name: "Cruisers-2", length: 3 } },
  { key: 4, text: "Cruisers-3", value: { name: "Cruisers-3", length: 3 } },
  { key: 5, text: "Submarine", value: { name: "Submarine", length: 2 } },
];

const Dropdown = ({ handleChange }) => (
  <DropDowns
    placeholder="Select a Ship"
    fluid
    selection
    wrapSelection={false}
    options={stateOptions}
    onChange={handleChange}
  />
);

export default Dropdown;
