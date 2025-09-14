import "../styles/ToggleButton.css";
import React from "react";

type Props = {
  text: string;
  type: "single" | "double";
  active: boolean;
};

const ToggleButton = ({text, type, active}: Props) => {
  //reference - servant-list.jpg

  const handleFilter = () => {
    console.log("Filters: " + type);
  };

  return (
    <div className="filter-button-wrapper">
      <input type="checkbox" id={`filter-toggle-${text}`} className="filter-checkbox" defaultChecked={active}/>
      <label htmlFor={`filter-toggle-${text}`} className="filter-button" onClick={handleFilter}>
        {text}
      </label>
    </div>
  );
};

export default ToggleButton;
