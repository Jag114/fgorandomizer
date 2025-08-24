import '../styles/Servant.css';
import React from 'react';
import rarityStarConverter from '../data/rarityStarConverter';
import capitalizeString from '../data/capitalizeString';

import servantData from "../data/saber.json"

const Servant = (props: any) => {

  const borderColor = (rarity: number) => {
    switch (rarity) {
      case 0:
        return "black-border"
      case 1:
      case 2:
        return "bronze-border"
      case 3:
        return "silver-border"
      case 4:
      case 5:
        return "gold-border"
      default:
        break;
    }
  }
  const classNames = `servantContainer ${borderColor(props?.servantInfo?.rarity)}`;
  const border = `servant-container ${borderColor(servantData?.rarity)}`;

  const testServantArray = [

  ]

  const backgroundServant = "../../public/icons/saber_party_img";

  return (
    // <div className={classNames}>
    //   <div className='servantClass'>  {capitalizeString(props.servantInfo.className)} </div>
    //   <img src={`https://static.atlasacademy.io/JP/Faces/f_${props.servantInfo.icon}3.png`} alt='Servant Icon' width='100' height='100' className='servantIcon'></img>
    //   <div className='servantName'> {props.servantInfo.name} </div>
    //   <div className='servantRarity'>  {rarityStarConverter(props.servantInfo.rarity)}</div>
    //   <button onClick={() => props.handleClick(false, props.number)} className='randomize-button'> Randomize </button>
    // </div>
    <div className={border} style={{
      backgroundImage: `url(${backgroundServant}.png)`,
      backgroundRepeat: "no-repeat",
    }}>
      <div className="servant-container-class">
        <img src="../../public/icons/saber_icon.png"></img>
        <p> {servantData.className} </p>
      </div>
      <p style={{
        color: "gold",
        fontSize: "1rem"
      }}> {rarityStarConverter(servantData.rarity)} </p>
      <p> {servantData.name} </p>
    </div>
  );

}

export default Servant; 