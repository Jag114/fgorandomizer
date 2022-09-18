import './Servant.css';
import React from 'react';

const Servant = (props) => {
  
  const rarity = (length) => {
    if(length === 0){
      return 0;
    }
    let stars = "";
    while(length > 0){
      stars += "⋆"; 
      length--;
    }
    return stars;
  }

  const capitalizedClassName = (string) => {
    return string[0].toUpperCase() + string.substring(1)
  }
  console.log(props);
  const getImage = async () => {
    const url = `https://static.atlasacademy.io/NA/Faces/f_${props.servantInfo.icon}3.png`;
    const options = {
        method: "GET"
    }

    let response = await fetch(url, options)
    if (response.status === 200) {
      console.log("Weszlo");
      return url;
    }
    else {
      console.log("HTTP-Error: " + response.status)
      return "";
    }
  }
  
  return (
    <div className='servantContainer'>
      <div className='servantClass'>  {capitalizedClassName(props.servantInfo.className)} </div>
      <img src={`https://static.atlasacademy.io/NA/Faces/f_${props.servantInfo.icon}3.png`} alt='Servant Icon' width='100' height='100' className='servantIcon'></img>
      <div className='servantName'> {props.servantInfo.name} </div>
      <div className='servantRarity'>  {rarity(props.servantInfo.rarity)}</div>
      <button onClick={() => props.handleClick(props.number)} className='randomizeB'> Randomize </button>
    </div>
  );

}

export default Servant; 