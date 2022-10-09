import React, { useState } from 'react';
import './Party.css';
import Servant from './Servant';
import servantFetch from '../data/servantFetch';

/*
  TODO:
    1. settings
      I*. choose cost
    2. appearance
      I. finish desktop viewport
        A. header, footer
        B. background
        C. stylize buttons
        D. fancy font*
      II. finish mobile viewport
        A. resizing
        B. class icon instead of class name, and other minimalisitc stuff*
      III. favico
    3. funcionality
      I*. ce randomizer
      II. include/exclude servants
      III. user profile (legit or local storage) that saves included/excluded servants (router)
    4. bugs
      I. repeating servants with single click, instead of having multi and single,
         change it to just single that can be called 1 or 5 times, should be easier to
         check if servants repeat tgemselves
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
  const checkIfDuplicate = (data, multi) => {
    let arrID = []
    let breakNr = 0;
    
    const usedArrID = servantList.map(s => {
      return s.id;
    })
    let availableID = data.data.map(e => {
      return e.collectionNo;
    })
    availableID = availableID.filter(id => {
      return usedArrID.indexOf(id) === -1;
    })
    
    while(arrID.length < 5){
      if(breakNr > 1000) break;
      let i = Math.floor(Math.random() * availableID.length);
      if(!arrID.includes(i)){
        arrID.push(i);
      }
      
      if(multi === false){
        console.log("Single - Data length", availableID.length);
        console.log("Single - New and unique", arrID);
        return arrID;
      }
      breakNr++;
    }
    console.log("Multi - Data length", availableID.length);
    console.log("Multi - New and unique", arrID);
    return arrID;
  }

  /*fetches data using servantFetch (returns array of objects),
  * using unique id's array, sets servant list using them
  * in case of singleClick it changes one servant in party hence "number" argument
  */

  const handleClick = (multi, number) => {
    servantFetch(formData, region).then(data => {
      if(multi === true && data.length < 5){
        setServantList(prevServantList => prevServantList);
        return alert("Too few servants, need more than 5, " + data.length + " chosen now")
      }
      else if(data.length < 1){
        setServantList(prevServantList => prevServantList);
        return alert("No servants to choose from, check region and filter settings")
      }
      if(multi === true) { setServantList([]) };
      const usedID = checkIfDuplicate(data, multi);
      if(number !== undefined){
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
      }else{
        usedID.forEach((e,nr) => {
          setServantList(prevServantList => {
            prevServantList[nr] = {
              id: data.data[e].collectionNo,
              name: data.data[e].name,
              icon: data.data[e].id,
              className: data.data[e].className,
              rarity: data.data[e].rarity,
          }
          return [...prevServantList]
        })
        })
      }
    })
  }
  
  const servantsDisplay = servantList.map((e,i) => (
    <Servant
      key = {i} 
      number = {i}
      handleClick = {handleClick}
      servantInfo = {e}
    />
  ))

  return (
  <main>
    <div className='party'>
      {servantsDisplay}
    </div>
    <div className='buttonHolder'>
      <button onClick={() => handleClick(true)} className='button'> Randomize </button>
    </div>
  </main>
  );
  
}
export default Party; 