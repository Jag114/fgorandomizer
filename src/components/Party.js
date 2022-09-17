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
    3. funcionality
      I*. ce randomizer
    4. bugs 
      I. endless loop in checkIfDuplicate
        - happens when there are less than 10 servants and user tries to randomize full
        party twice
        - if there are less than 5 servants to choose from put default servant object
        - do tests

    * - may not be in final version
*/
const Party = ({formData}) => {

  const servant = {
    id: 0,
    name: "Servant",
    icon: "Arthuria.webp",
    className: "Class",
    rarity: "5",
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
      let i = Math.floor(Math.random() * length);  //default "* length"
      if(howMany === 1){
        if(arrID.indexOf(i) === -1 && usedArrID.indexOf(i) === -1){
          arrID.push(i)
        }
      }
      else{
        if(arrID.indexOf(i) === -1){ 
          arrID.push(i)
        }
      }
    }
    return arrID;
  }

  const handleClickMulti = () => {
    setServantList([]);
    servantFetch(formData).then(data => {
      const usedID = checkIfDuplicate(5, data.length)
      usedID.forEach(e => {
      setServantList(prevServantList => [...prevServantList, {
        id: data.data[e].collectionNo,
        name: data.data[e].name,
        icon: data.data[e].icon,
        className: data.data[e].className,
        rarity: data.data[e].rarity
      }])
    })
  }); 
  };

  const handleClickSingle = (number) => {
    servantFetch(formData).then(data => {
      const usedID = checkIfDuplicate(1, data.length)
      usedID.forEach(e => {
        setServantList(prevServantList => {
          prevServantList[number] = {
            id: data.data[e].collectionNo,
            name: data.data[e].name,
            icon: data.data[e].icon,
            className: data.data[e].className,
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