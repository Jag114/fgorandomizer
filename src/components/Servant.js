import './Servant.css';
import React from 'react';
import { useState } from "react"


function Servant () {

  const [ servant, setServant ] = useState({
    id: 0,
    name: "Servant",
    icon: "Arthuria.webp",
    class: "Class",
    rarity: "⋆?"
  })

  const handleClickSingle = () => {
    fetch('servants.json')
      .then(response => response.json())
      .then(data => {
        let i = Math.floor(Math.random() * data.servants.length); 
        setServant(({
          id: data.servants[i].id,
          name: data.servants[i].name,
          icon: data.servants[i].icon,
          class: data.servants[i].class,
          rarity: data.servants[i].rarity
        }))
      })
  };

  return (
    <div className='servantContainer'>
      <div className='servantName'> {servant.name} </div>
      <img src={`./icons/${servant.icon}`} alt='arthuria' width='100' height='100' className='servantIcon'></img>
      <div className='servantClass'>  {servant.class} </div>
      <div className='servantRarity'>  {servant.rarity}</div>
      <button onClick={handleClickSingle} className='randomizeB'> Randomize </button>
    </div>
  );

}

export default Servant; 