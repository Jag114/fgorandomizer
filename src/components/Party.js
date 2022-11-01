import { useState } from 'react';
import './Party.css';
import Servant from './Servant';
import servantFetch from '../data/servantFetch';

/*
  TODO:
    1. settings
      I*. choose cost
    2. appearance
      I. finish desktop viewport
        D. fancy font*
      II. finish mobile viewport
        A. resizing
      III. favico
      IV. change button appearnce on hover/on click
      V. user profile
        A. keeps it in local storage
        B. keep checkboxes un/checked between pages
    3. funcionality
      I*. ce randomizer
    4. bugs
      I. profile:
        A. if not enough servants chosen e.g 1, multi button puts mash into slot nr 1 and leaves it at that,
        B. if servants chosen in user profile, multi button only takes servants with IDs 1-n 
          (where n is number of servants chosen), single works as intended 
      
    * - may not be in final version
*/
const Party = ({formData, region, userProfile}) => {
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
    if(userProfile.length > 0){
      availableIDArr = availableIDArr.filter(e => { //ids from all servants currently available - servants not included in users profile
        return userProfile.includes(e);
      })
    }
    console.log("availableIDArr: ",availableIDArr);
    let filteredAvailableIDArr = availableIDArr.filter(id => { //ids from all servants currently available and in users profile - ids used in party on screen
      return usedIDArr.indexOf(id) === -1;
    })
    console.log("filteredAvailableIDArr: ",filteredAvailableIDArr);
    while(arrID.length < 5){
      if(breakNr > 1000) break;
      i = Math.floor(Math.random() * availableIDArr.length); //arr index, not id nr
      if(data.length === 1){
        arrID.push(i);
      }
      if(multi === false){
        i = Math.floor(Math.random() * filteredAvailableIDArr.length)
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
      if(arrID.includes(i) === false){
        arrID.push(i);
      }
      breakNr++;
    }
    console.log(arrID);
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
      <button onClick={() => handleClick(true)} className='button'> Randomize Party</button>
    </div>
  </main>
  );
  
}
export default Party; 