import "../styles/RandomizeButton.css";
import React from "react";

type Props = {
  text: string;
  type: "single" | "multi";
};

const RandomizeButton =  ({ text, type }: Props) => {
  //reference - banner.jpg

  const handleRandomize = () => {
    console.log("Randomize: " + type);
  };

  return (
    <button className="randomize-button" onClick={handleRandomize}>
      <span> {text} </span>
    </button>
  );
};

export default RandomizeButton;
