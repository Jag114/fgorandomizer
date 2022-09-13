import "./SettingsMenu.css";
import React, { useState } from "react";
import settingsLogo from '../icons/settings.png'

const SettingsMenu = () => {
  const [ settings, setSettings ] = useState({
    rarity: [],
    class: []
  })  

  const [ isSeen, setIsSeen ] = useState(false)

  const saveSettings = () => {
    setSettings(prevSettings => {})
  }

  const handleClick = () => {
    setIsSeen(prevIsSeen => !prevIsSeen)
  }

  return (
    <div className="settings-menu">
      <div className="settings-rarity">
        <input type="checkbox" className="settings-checkbox" />
        <label>0</label>
        <input type="checkbox" className="settings-checkbox" />
        <label className="star-label">⋆</label>
        <input type="checkbox" className="settings-checkbox" />
        <label className="star-label">⋆⋆</label>
        <input type="checkbox" className="settings-checkbox" />
        <label className="star-label">⋆⋆⋆</label>
        <input type="checkbox" className="settings-checkbox" />
        <label className="star-label">⋆⋆⋆⋆</label>
        <input type="checkbox" className="settings-checkbox" />
        <label className="star-label">⋆⋆⋆⋆⋆</label>
      </div>
      <br />
      <div className="settings-class">
        <div className="knight-classes">
          <input type="checkbox" className="settings-checkbox" />
          <label>Saber</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Archer</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Lancer</label>
          <br />
        </div>
        <div className="cavalry-classes">
          <input type="checkbox" className="settings-checkbox" />
          <label>Rider</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Caster</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Assassin</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Berserker</label>
          <br />
        </div>
        <div className="new-classes">
          <input type="checkbox" className="settings-checkbox" />
          <label>Foreigner</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Alter Ego</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Pretender</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Shielder</label>
          <br />
        </div>
        <div className="extra-classes">
          <input type="checkbox" className="settings-checkbox" />
          <label>Ruler</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Avenger</label>
          <br />
          <input type="checkbox" className="settings-checkbox" />
          <label>Moon Cancer</label>
          <br />
        </div>
      </div>
      <button className="settings-button"> Save settings </button>
      <img src={settingsLogo} alt='globalSettingsButton' onClick={handleClick} className='settings-icon'/>
    </div>
  );
};

export default SettingsMenu;
