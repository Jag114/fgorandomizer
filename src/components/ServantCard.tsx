import "../styles/UserServantList.css";
import rarityStarConverter from "../data/rarityStarConverter";
import capitalizeString from "../data/capitalizeString";
import React from "react";

import type { ServantComponentProps } from "../data/dataTypes";

const ServantCard : React.FC<ServantComponentProps> = ({region, profile, setProfile}) => {
  let servantData = null;
  try{
    servantData = require("../../public/saber.json");
  }
  catch{
    console.error("SERVANT DATA JSON NOT FOUND");
  }

  return (
    <div className="servant-card">
      <div className="servant-card-rarity"></div>
      <div className="servant-card-portrait">
        <img src="../../public/saber.png"></img>
      </div>
      <div className="servant-card-name"></div>
      <div className="servant-card-class"></div>
      <div className="servant-card-buttons">
        <button className="servant-class-buttons-randomize"></button>
        <button className="servant-class-buttons-remove"></button>
      </div>
      <p> {region} </p>
      <p> {profile} </p>
      <p> {setProfile} </p>
    </div>
  )
}

// const ServantCard = (props) => {
//   const { region, userProfile, setUserProfile } = props;

//   const handleChange = (id) => {
//     const savedProfile = [...userProfile];

//     if (savedProfile.includes(`${id}`)) {
//       savedProfile.splice(savedProfile.indexOf(`${id}`), 1);
//     } else {
//       savedProfile.push(`${id}`);
//     }
//     setUserProfile(savedProfile);
//   };
  
//   const profile = JSON.parse(localStorage.getItem(`userProfile-${region}`));
//   let style;
//   if (profile.includes(`${props.id}`)) {
//     style = { backgroundColor: "green" };
//   } else {
//     style = { backgroundColor: "gray" };
//   }

//   let doShow = true;
//   if(props.show1 === false || props.show2 === false){
//     doShow = false;
//   }

//   return (doShow === true) ? (
//     <div
//       onClick={() => handleChange(props.id)}
//       id={props.id}
//       className="profile-servant-net-card"
//       style={style}
//     >
//       <p> {"<--Press to include-->"} </p>
//       <p> {props.name} </p>
//       <p> {capitalizeString(props.className)} </p>
//       <p> {rarityStarConverter(props.rarity)} </p>
//     </div>
//   ) : null;
// };

export default ServantCard;
