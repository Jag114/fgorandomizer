import React, { useState } from 'react';
import './Party.css';
import Servant from './Servant';

function Party() {

  const [ servant, setServant ] = useState({
    id: 0,
    name: "Servant",
    icon: "Arthuria.webp",
    class: "Class",
    rarity: "⋆?",
    key: null
  })

  const [ servantList, setServantList ] = useState([
    servant,servant,servant,servant,servant
  ])

  const handleClickMulti = () => {
    setServantList([]);
    const arrID = [];
    while(arrID.length < 5){
      var i = Math.floor(Math.random() * 8); 
      if(arrID.indexOf(i) === -1){
        arrID.push(i)
      }
    }
      fetch('servants.json')
        .then(response => response.json())
        .then(data => {
        arrID.forEach(e => {
          setServantList(prevServantList => [...prevServantList, {
            id: data.servants[e].id,
            name: data.servants[e].name,
            icon: data.servants[e].icon,
            class: data.servants[e].class,
            rarity: data.servants[e].rarity,
            key: e
          }])
        })
      }) 

  };

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
          rarity: data.servants[i].rarity,
          //key: i
        }))
      })
  };

  const servantsDisplay = servantList.map(e => (
    <Servant
      key={e.key}
      handleClick={() => handleClickSingle}
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