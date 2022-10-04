import "./SettingsMenu.css";
import servantFetch from '../data/servantFetch';
import React from "react";

let rarityArr = []
let classArr = []

const SettingsMenu = ({formData, setFormData, region, setRegion}) => {
  //adds/removes class/rarity limitations from settings form to 2 separate arrays
  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    switch (name) {
      case "rarity":
        setFormData(prevFormData => {
            if(!prevFormData.rarity.includes(value)){
              if(checked === true){
                rarityArr.push(parseInt(value));
              }
            }
            if(!checked){
              rarityArr.splice(rarityArr.indexOf(value), 1);
            } 
          classArr = [...checkDuplicates(rarityArr)];
          return {rarity: [...classArr], className: [...prevFormData.className]};
        })
        break;
      case "class":
        if(!classArr.includes(value)){
          if(checked === true){
            classArr.push(value)
          }
        }
        if(checked === false){
          classArr.splice(classArr.indexOf(value), 1)
        }
        break;
      default:
        break;
    }
  }

  function checkDuplicates (arr) {
    let valuesSoFar = {};
    let value;
    let uniqueArr = [];
    for (let i = 0; i < arr.length; i++) {
      value = arr[i];
      if(!(value in valuesSoFar)) {
        valuesSoFar[value] = true;
        uniqueArr.push(value);
      }
    }
    return uniqueArr;
  }
  
  //puts class/rarity limiations from aforementioned arrays to state taken from app component
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    //setFormData(prevFormData => prevFormData)
  }

  const reFetchData = () => {
    localStorage.setItem("servantsData", JSON.stringify([]))
    servantFetch({rarity: [], className: []}, region);
  }

  const changeServerData = () => {
    localStorage.setItem("servantsData", JSON.stringify([]));
    setRegion((prevRegion) => {
      if(prevRegion === "na"){
        localStorage.setItem("region", JSON.stringify(true))
        return "jp";
      }
      localStorage.setItem("region", JSON.stringify(false))
      return "na";
    });
  }

    return (
      <div className="settings-menu">
        <form onSubmit={handleSubmit}>
        <label className="switch">
          <input type="checkbox" onChange={changeServerData} checked={JSON.parse(localStorage.getItem("region"))}/>
          <span className="slider round"></span>
        </label>
          <div className="settings-rarity">
            <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="rarity" value="0"/>
            <label>0</label>
            <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="rarity" value="1"/>
            <label className="star-label">⋆</label>
            <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="rarity" value="2"/>
            <label className="star-label">⋆⋆</label>
            <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="rarity" value="3"/>
            <label className="star-label">⋆⋆⋆</label>
            <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="rarity" value="4"/>
            <label className="star-label">⋆⋆⋆⋆</label>
            <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="rarity" value="5"/>
            <label className="star-label">⋆⋆⋆⋆⋆</label>
          </div>
          <br />
          <div className="settings-class">
            <div className="knight-classes">
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="saber"/>
              <label>Saber</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="archer"/>
              <label>Archer</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="lancer"/>
              <label>Lancer</label>
              <br />
            </div>
            <div className="cavalry-classes">
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="rider"/>
              <label>Rider</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="caster"/>
              <label>Caster</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="assassin"/>
              <label>Assassin</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="berserker"/>
              <label>Berserker</label>
              <br />
            </div>
            <div className="new-classes">
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="foreigner"/>
              <label>Foreigner</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="alterEgo"/>
              <label>Alter Ego</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="pretender"/>
              <label>Pretender</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="shielder"/>
              <label>Shielder</label>
              <br />
            </div>
            <div className="extra-classes">
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="ruler"/>
              <label>Ruler</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="avenger"/>
              <label>Avenger</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="moonCancer"/>
              <label>Moon Cancer</label>
              <br />
            </div>
          </div>
          <button className="settings-button" onClick={reFetchData}> Re-fetch data </button>
          <button className="settings-button"> Save settings </button>
        </form>
      </div>
    )
};

export default SettingsMenu;
