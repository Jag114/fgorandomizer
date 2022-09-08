import React, { useState } from 'react';
import './Party.css';
import Servant from './Servant';
/*
  TODO:
    1. settings
      I. choose rarity
      II. choose class
      III*. choose cost
    2. appearance
      I. mobile viewport
      II, custom rarity for mash " 3 <br> 4 <br> 5? "
    3. code readability and customizability
      I. put fetch/es into other file/s
    4. funcionality
      I*. ce randomizer

    * - may not be in final version
*/
const Party = () => {

  const servantListLength = 10; //10 or more, else endless loop in checkIfDuplicate()

  const servant = {
    id: 0,
    name: "Servant",
    icon: "Arthuria.webp",
    class: "Class",
    rarity: "⋆?",
  }

  const [ servantList, setServantList ] = useState([
    servant,servant,servant,servant,servant
  ])

  const checkIfDuplicate = (howMany) => {
    const usedArrID = servantList.map(s => {
      return s.id
    })
    const arrID = [];
    while(arrID.length < howMany){
      let i = Math.floor(Math.random() * servantListLength); //fetch for servants.json length?
      if(arrID.indexOf(i) === -1 && usedArrID.indexOf(i+1) === -1){ // i+1 cuz of difference between servant ID and place in array
        arrID.push(i)
      }
    }
    return arrID;
  }

  const handleClickMulti = () => {
    setServantList([]);
    const usedID = checkIfDuplicate(5)
      fetch('servants.json')
        .then(response => response.json())
        .then(data => {
          usedID.forEach(e => {
          setServantList(prevServantList => [...prevServantList, {
            id: data.servants[e].id,
            name: data.servants[e].name,
            icon: data.servants[e].icon,
            class: data.servants[e].class,
            rarity: data.servants[e].rarity
          }])
        })
      }) 
  };

  const handleClickSingle = (number) => {
    const usedID = checkIfDuplicate(1)
    fetch('servants.json')
      .then(response => response.json())
      .then(data => {
        usedID.forEach(e => {
          setServantList(prevServantList => {
            prevServantList[number] = {
            id: data.servants[e].id,
            name: data.servants[e].name,
            icon: data.servants[e].icon,
            class: data.servants[e].class,
            rarity: data.servants[e].rarity
          }
          return [...prevServantList]
        })
        })
      })
  };
  
  const servantsDisplay = servantList.map((e,i) => (
    <Servant
      key = {i}
      number = {i}
      handleClick = {handleClickSingle}
      servantInfo = {e}
    />
    ))

  return (
  <main>
    <div className='party'>
      {servantsDisplay}
    </div>
    <div className='buttonHolder'>
      <button onClick={handleClickMulti} className='button'> Randomize </button>
    </div>
  </main>
  );
  
}
export default Party; 