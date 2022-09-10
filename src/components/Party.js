import React, { useState } from 'react';
import './Party.css';
import Servant from './Servant';
import servantFetch from '../data/servantFetch';

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

  const checkIfDuplicate = (howMany, length) => {
    const usedArrID = servantList.map(s => {
      return s.id
    })

    const arrID = [];
    while(arrID.length < howMany){
      let i = Math.floor(Math.random() * length);
      if(arrID.indexOf(i) === -1 && usedArrID.indexOf(i+1) === -1){ // i+1 cuz of difference between servant ID and place in array
        arrID.push(i)
      }
    }
    return arrID;
  }

  const handleClickMulti = () => {
    setServantList([]);
    servantFetch().then(data => {
      const usedID = checkIfDuplicate(5, data.length)
      usedID.forEach(e => {
      setServantList(prevServantList => [...prevServantList, {
        id: data.data[e].id,
        name: data.data[e].name,
        icon: data.data[e].icon,
        class: data.data[e].class,
        rarity: data.data[e].rarity
      }])
    })
  }); 
  };

  const handleClickSingle = (number) => {
    servantFetch().then(data => {
      const usedID = checkIfDuplicate(1, data.length)
      usedID.forEach(e => {
        setServantList(prevServantList => {
          prevServantList[number] = {
            id: data.data[e].id,
            name: data.data[e].name,
            icon: data.data[e].icon,
            class: data.data[e].class,
            rarity: data.data[e].rarity
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