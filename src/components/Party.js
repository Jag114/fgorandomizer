import { useState } from 'react';
import './Party.css';
import Servant from './Servant';
import servantFetch from '../data/servantFetch';

/*
  TODO:
    1. settings
      I*. choose cost
      II. user profile filters, sorting
    2. appearance
      I. finish desktop viewport
        A. fancy font*
        B. user profile
      II. finish mobile viewport
        A. resizing
        B. user profile
      III. favico
      IV. change button appearnce on hover/on click
        A. filters
    3. funcionality
      I*. ce randomizer
      II. separate userProfiles for regions so they dont create glitches
    4. bugs
      https://www.npmjs.com/package/npm-check-updates
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

  if(!localStorage.getItem(`userProfile-${region}`)){
    localStorage.setItem(`userProfile-${region}`, JSON.stringify([]));
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
    
    const savedProfile = [...JSON.parse(localStorage.getItem(`userProfile-${region}`)).map(e => parseInt(e))];//ids are saved as strings

    const usedIDArr = servantList.map(s => { //ids used in party on screen
      return s.id;
    })
    let availableIDArr = data.data.map(e => { //ids from all servants currently available
      return e.collectionNo;
    })
    if(savedProfile.length > 0){
      availableIDArr = availableIDArr.filter(e => { //ids from all servants currently available - servants not included in users profile
        return savedProfile.includes(e);
      })
    }
    let filteredAvailableIDArr = availableIDArr.filter(id => { //ids from all servants currently available and in users profile - ids used in party on screen
      return usedIDArr.indexOf(id) === -1;
    })

    if(filteredAvailableIDArr.length === 0){
      alert("All available servants are on the screen right now, can't randomize.")
    }

    console.log("usedIDArr: ", usedIDArr);
    console.log("avaiableIDArr: ", availableIDArr);
    console.log("filteredAvaialbleIDArr: ", filteredAvailableIDArr);
    console.log("User profile: ", savedProfile);

    while(arrID.length < 5){
      if(breakNr > 1000) break;
      i = Math.floor(Math.random() * availableIDArr.length); //arr index, not id nr
      if(data.length === 1){
        arrID.push(i);
      }
      if(multi === false){
        i = Math.floor(Math.random() * filteredAvailableIDArr.length);//arr index, not id nr
        const chosenID = filteredAvailableIDArr[i];
        if(usedIDArr.includes(filteredAvailableIDArr[i].collectionNo) === false){
          data.data.forEach(e => {
            if(e.collectionNo === chosenID){
              arrID.push(data.data.indexOf(e));
            }
          })
        }
        return arrID;
      }
      
        const chosenID = availableIDArr[i];
        data.data.forEach(e => {
          if(e.collectionNo === chosenID){
            if(arrID.includes(data.data.indexOf(e)) === false){
              arrID.push(data.data.indexOf(e));
            }
          }
        })
      
      breakNr++;
    }
    console.log("Arr ID: ",arrID);
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
      if(number !== undefined){ //single
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
      }else{ //multi
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
      <button onClick={() => handleClick(true)} className='button'> Randomize Party</button>
    </div>
  </main>
  );
  
}
export default Party; 