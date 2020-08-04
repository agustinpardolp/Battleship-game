import React from "react";
import { Dropdown as DropDowns } from "semantic-ui-react";
import {shipOptions} from "../../utils/constants";


const Dropdown = ({ handleChange, selectedShipType }) => (

  <DropDowns
    placeholder="Select a Ship"
    fluid
    selection
    wrapSelection={false}
    options={shipOptions}
    onChange={handleChange}
  />
);

export default Dropdown;
