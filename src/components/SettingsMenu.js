import "./SettingsMenu.css";
import React, { useState } from "react";
import settingsLogo from "../icons/settings.png";

let rarityArr = []
let classArr = []

const SettingsMenu = ({formData, setFormData}) => {
 
  const [ isVisible, setIsVisible ] = useState(false)

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    switch (name) {
      case "rarity":
        if(!rarityArr.includes(value)){
          if(checked === true){
            rarityArr.push(parseInt(value))
          }
        }
        if(checked === false){
          rarityArr.splice(rarityArr.indexOf(parseInt(value)), 1)
        }
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
    console.log("A",rarityArr, classArr);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData(() => {
      return {
        rarity: [...rarityArr],
        class: [...classArr]
      }
    })
    console.log("B",rarityArr, classArr);
    console.log(formData);
  }

  const setVisibility = () => {
    setIsVisible(prevIsVisible => !prevIsVisible)
  }

  if(isVisible){
    return (
      <div className="settings-menu">
        <form onSubmit={handleSubmit}>
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
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Saber"/>
              <label>Saber</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Archer"/>
              <label>Archer</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Lancer"/>
              <label>Lancer</label>
              <br />
            </div>
            <div className="cavalry-classes">
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Rider"/>
              <label>Rider</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Caster"/>
              <label>Caster</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Assassin"/>
              <label>Assassin</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Berserker"/>
              <label>Berserker</label>
              <br />
            </div>
            <div className="new-classes">
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Foreigner"/>
              <label>Foreigner</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Alter Ego"/>
              <label>Alter Ego</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Pretender"/>
              <label>Pretender</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Shielder"/>
              <label>Shielder</label>
              <br />
            </div>
            <div className="extra-classes">
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Ruler"/>
              <label>Ruler</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Avenger"/>
              <label>Avenger</label>
              <br />
              <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="Moon Cancer"/>
              <label>Moon Cancer</label>
              <br />
            </div>
          </div>
          <button className="settings-button"> Save settings </button>
        </form>
        <img
          src={settingsLogo}
          onClick={setVisibility}
          alt="globalSettingsButton"
          className="settings-icon"
        />
      </div>
    )
  }else{
    return (
      <img
        src={settingsLogo}
        onClick={setVisibility}
        alt="globalSettingsButton"
        className="settings-icon"
      />
    )
  }
  
};

export default SettingsMenu;
