import "./SettingsMenu.css";
import servantFetch from '../data/servantFetch';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import FilterMenu from "./FilterMenu";

const SettingsMenu = ({formData, setFormData, region, setRegion}) => {
  const navigate = useNavigate();
  const handlePath = (e) => {
    e.preventDefault();
    if(!localStorage.getItem(`servantsData-${region}`)){
      localStorage.setItem(`userProfile-${region}`, JSON.stringify([]));
      servantFetch({rarity: [], className: []}, region).then(() => navigate("/profile"));
    }
    else{
      navigate("/profile");
    }
  }

  const reFetchData = (e) => {
    e.preventDefault();
    localStorage.setItem(`servantsData-${region}`, JSON.stringify([]))
    servantFetch({rarity: [], className: []}, region);
  }

  const changeServerData = () => {
    setRegion((prevRegion) => {
      if(prevRegion === "na"){
        return "jp";
      }
      return "na";
    });
  }
  const [ showMenu, setShowMenu ] = useState(false);
  const showFilterMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  }

    return (
      <div className="settings-menu">
        <label className="switch">
          <input type="checkbox" onChange={changeServerData} checked={region === "na" ? false : true}/>
          <span className="slider round"></span>
        </label>
        <br/>
          <button className="settings-button" onClick={handlePath}> Go to profile </button>
          <button className="settings-button" onClick={reFetchData}> Re-fetch data </button>
          <button className="settings-button" onClick={showFilterMenu}> Filter </button>
          {showMenu === true ? 
           <FilterMenu region={region} setFormData={setFormData} formData={formData} setShowMenu={setShowMenu}/> 
          : null}
      </div>
    )
};

export default SettingsMenu;
