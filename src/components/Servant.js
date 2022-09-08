import './Servant.css';
import React from 'react';

const Servant = (props) => {

  const rarity = (length) => {
    let stars = "";
    while(length > 0){
      stars += "⋆"; 
      length--;
    }
    return stars;
  }

  return (
    <div className='servantContainer'>
      <div className='servantClass'>  {props.servantInfo.class} </div>
      <img src={`./icons/${props.servantInfo.icon}`} alt='arthuria' width='100' height='100' className='servantIcon'></img>
      <div className='servantName'> {props.servantInfo.name} </div>
      <div className='servantRarity'>  {rarity(props.servantInfo.rarity)}</div>
      <button onClick={() => props.handleClick(props.number)} className='randomizeB'> Randomize </button>
    </div>
  );

}

export default Servant; 