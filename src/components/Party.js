import React, { useState } from 'react';
import './Party.css';
import Servant from './Servant';
import servantFetch from '../data/servantFetch';

/*
  TODO:
    1. settings
      I*. choose cost
      II. change server data
    2. appearance
      I. finish desktop viewport
      II. finish mobile viewport
    3. funcionality
      I*. ce randomizer
      II. include/exclude servants
      III. user profile (legit or local storage) that saves included/excluded servants (router)
    4. bugs
      I. change region - re-rendering issue? re-fetching after region change fixes it
    * - may not be in final version
*/
const Party = ({formData, region}) => {
  //default servant template
  const servant = {
    id: 0,
    name: "Servant",
    icon: "100100",  //arthuria
    className: "Class",
    rarity: 5,
  }

  const [ servantList, setServantList ] = useState([
    servant,servant,servant,servant,servant
  ])

  /*checks if servants are duplicated,
  * for single click: checks if it exists already in party and check if its the same as  
  * previous one
  * for multi click: check if it exists in party
  * returns array of unique servant id's 
  */
  const checkIfDuplicate = (howMany, length) => {

    const arrID = [];
    const usedArrID = servantList.map(s => {
      return s.id
    })

    while(arrID.length < howMany){
      let i = Math.floor(Math.random() * length);  //servant list length
      if(howMany === 1){
        if(length > 2){
          if(arrID.indexOf(i) === -1 && usedArrID.indexOf(i+1) === -1){ // i+1 cuz of diference between index and id
            arrID.push(i)
          }
        }else{
          arrID.push(i);
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

  /*fetches data using servantFetch (returns array of objects),
  * using unique id's array, sets servant list using them
  * in case of singleClick it changes one servant in party hence "number" argument
  */
  const handleClickMulti = () => {
    servantFetch(formData, region).then(data => {
      if(data.length < 5) {
        setServantList(prevServantList => prevServantList);
        return alert("Too few servants, need more than 5, " + data.length + " chosen now")
      }
      setServantList([]);
      const usedID = checkIfDuplicate(5, data.length)  
      usedID.forEach(e => {
      setServantList(prevServantList => [...prevServantList, {
        id: data.data[e].collectionNo,
        name: data.data[e].name,
        icon: data.data[e].id,
        className: data.data[e].className,
        rarity: data.data[e].rarity,
      }])
    })
  }); 
  };

  const handleClickSingle = (number) => {
    servantFetch(formData, region).then(data => {
      const usedID = checkIfDuplicate(1, data.length)
      usedID.forEach(e => {
        setServantList(prevServantList => {
          prevServantList[number] = {
            id: data.data[e].collectionNo,
            name: data.data[e].name,
            icon: data.data[e].id,
            className: data.data[e].className,
            rarity: data.data[e].rarity,
        }
        return [...prevServantList]
      })
      })
    })
  };
  
  const servantsDisplay = servantList.map((e,i) => (
    <Servant
      key = {i} //throws error for firts render with template servant
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