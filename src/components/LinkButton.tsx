import "../styles/LinkButton.css";
import React from "react";

type Props = {
  text: string;
  url: string;
  icon: string;
};

const LinkButton = ({ text, url, icon }: Props) => {
  //reference - menu.jpg
  return (
    <a className="link-button" href={url} target="_blank" rel="noopener noreferrer">
      <div className="link-button-icon">
        <img alt={"Hyperlink to: " + url} src={`/icons/${icon}.svg`}></img>
      </div>
      <div className="link-button-text">
        <p id="upper-text">{text}</p>
        <div id="line"></div>
        <p id="lower-text">{text}</p>
      </div>
    </a>
  );
};

export default LinkButton;
