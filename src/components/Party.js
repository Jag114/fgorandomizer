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
    let i;
    const usedIDArr = servantList.map(s => { //ids used in party on screen
      return s.id;
    })
    let availableIDArr = data.data.map(e => { //ids from all servants currently available
      return e.collectionNo;
    })
    let filteredAvailableIDArr = availableIDArr.filter(id => { //ids from all servants currently available - ids used in party on screen
      return usedIDArr.indexOf(id) === -1;
    })
    
    while(arrID.length < 5){
      if(breakNr > 1000) break;
      i = Math.floor(Math.random() * availableIDArr.length); //arr index, not id nr
      if(data.length === 1){
        arrID.push(i);
      }
      if(multi === false){
        i = Math.floor(Math.random() * filteredAvailableIDArr.length)
        console.log("Used IDs", usedIDArr);
        console.log("All IDs: ", availableIDArr);
        console.log("All usable IDs: ", filteredAvailableIDArr);
        console.log("Chosen ID", filteredAvailableIDArr[i]);
        console.log(usedIDArr.includes(filteredAvailableIDArr[i].collectionNo));
        if(usedIDArr.includes(filteredAvailableIDArr[i].collectionNo) === false){
          arrID.push(filteredAvailableIDArr[i]);
          //find index of object with filteredAvailableIDArr[i] as collectionNo in data.data, and push it
        }
        console.log(arrID);
        return arrID;
      }
      if(arrID.includes(i) === false){
        arrID.push(i);
      }
      breakNr++;
    }
    return arrID;
  }

  /*fetches data using servantFetch (returns array of objects),
  * using unique id's array, sets servant list using them
  * in case of singleClick it changes one servant in party hence "number" argument
  */

  const handleClick = (multi, number) => {
    servantFetch(formData, region).then(data => {
      if(multi === true && data.length < 5){
        return alert("Too few servants, need more than 5, " + data.length + " chosen now")
      }
      else if(data.length < 1){
        return alert("No servants to choose from, check region and filter settings")
      }
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