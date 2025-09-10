import "../styles/LinkButton.css";
import React from "react";

type Props = {
  text: string;
  url?: string;
  icon?: string;
};

const LinkButton = ({ text, url, icon }: Props) => {
  //reference - menu.jpg
  return (
    <button className="link-button" onClick={() => window.open(url)}>
      <div className="link-button-icon">
        <img src={`/icons/${icon}.svg`}></img>
      </div>
      <div className="link-button-text">
        <p id="upper-text">{text}</p>
        <div id="line"></div>
        <p id="lower-text">{text}</p>
      </div>
    </button>
  );
};

export default LinkButton;
