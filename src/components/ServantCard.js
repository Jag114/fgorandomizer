import { useState } from "react";
import "./UserServantList.css";

const ServantCard = (props) => {

  const [ update, useUpdate ] = useState(false);
  let isChosen = false;

  const capitalizedClassName = (string) => {
    return string[0].toUpperCase() + string.substring(1);
  };

  const rarityIcon = (length) => {
    if (length === 0) {
      return 0;
    }
    let stars = "";
    while (length > 0) {
      stars += "⋆";
      length--;
    }
    return stars;
  };

  const handleChange = (id) => {
    if (localStorage.getItem("userProfile") === false){ //check if exists, if not create
      localStorage.setItem("userProfile", JSON.stringify([]));
    }
    console.log("A");
    const savedProfile = [...JSON.parse(localStorage.getItem("userProfile"))];

    if (savedProfile.includes(id)) {
      savedProfile.splice(savedProfile.indexOf(id), 1);
      localStorage.setItem("userProfile", JSON.stringify(savedProfile));
      isChosen = false;
    } else {
      savedProfile.push(id);
      localStorage.setItem("userProfile", JSON.stringify(savedProfile));
      isChosen = true;
    }
  };

  return (
    <div onClick={() => handleChange(props.id)} className="profile-servant-net-card" style={isChosen ? {backgroundColor:"green"} : {backgroundColor:"red"}}>
      <p> {"<--Press to include-->"} </p>
      <p> {props.name} </p>
      <p> {capitalizedClassName(props.className)} </p>
      <p> {rarityIcon(props.rarity)} </p>
      <input type="checkbox" onChange={handleChange(props.id)}></input>
    </div>
  );
};

export default ServantCard;
