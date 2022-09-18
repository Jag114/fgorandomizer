import React, { useState } from 'react';
import './Party.css';
import Servant from './Servant';
import servantFetch from '../data/servantFetch';

/*
  TODO:
    1. settings
      III*. choose cost
    2. appearance
      I. mobile viewport
    3. funcionality
      I*. ce randomizer
    * - may not be in final version
*/
const Party = ({formData}) => {

  const servant = {
    id: 0,
    name: "Servant",
    icon: "100100",  //arthuria
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
    servantFetch(formData).then(data => {
      if(data.length < 5) {
        setServantList(prevServantList => prevServantList);
        return alert("Too few servants")
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
    servantFetch(formData).then(data => {
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