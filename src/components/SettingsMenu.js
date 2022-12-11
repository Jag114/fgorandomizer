import "./SettingsMenu.css";
import servantFetch from '../data/servantFetch';
import { useNavigate } from "react-router-dom";
import React from "react";
import FilterMenu from "./FilterMenu";
import checkDuplicates from "../data/checkDuplicatesInArr";

let rarityArr = [];
let classArr = [];
let rarityAllChecked = false;
let classAllChecked = false;

const SettingsMenu = ({formData, setFormData, region, setRegion}) => {
  let renderCounter = 0; //for strict mode

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
              if(renderCounter === 0){ //for strict mode
                rarityArr.splice(rarityArr.indexOf(parseInt(value)), 1);
                renderCounter++;
              }
            } 
          rarityArr = [...checkDuplicates(rarityArr)];
          return {rarity: [...rarityArr], className: [...prevFormData.className]};
        })
        break;
      case "class":
        setFormData(prevFormData => {
          if(!prevFormData.className.includes(value)){
            if(checked === true){
              classArr.push(value);
            }
          }
          if(!checked){
            if(renderCounter === 0){ //for strict mode
              classArr.splice(classArr.indexOf(value), 1);
              renderCounter++;
            }
          } 
        classArr = [...checkDuplicates(classArr)];
        return {className: [...classArr], rarity: [...prevFormData.rarity]};
      })
        break;
      default:
        break;
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

  const checkAll = (type) => {
    let checkboxes = document.getElementsByName(type);
    for (let checkbox of checkboxes) {
      if(rarityAllChecked === true || classAllChecked === true){
        checkbox.checked = false;
        type === "rarity" ? 
          rarityArr.splice(rarityArr.indexOf(checkbox.value), 1) : 
          classArr.splice(classArr.indexOf(checkbox.value), 1);
      }else{
        checkbox.checked = true;
          type === "rarity" ? 
            rarityArr.push(parseInt(checkbox.value)) : 
            classArr.push(checkbox.value);
      }
    }
    rarityArr = checkDuplicates(rarityArr);
    classArr = checkDuplicates(classArr);
    if(type === "rarity"){
      rarityAllChecked = !rarityAllChecked;
    }else{
      classAllChecked = !classAllChecked;
    }
    setFormData({rarity: [...rarityArr], className: [...classArr]});
  }

    return (
      <div className="settings-menu">
         <label className="switch">
          <input type="checkbox" onChange={changeServerData} checked={region === "na" ? false : true}/>
          <span className="slider round"></span>
        </label>
          <label> Select all classes</label>
          <input type="checkbox" onChange={() => checkAll("class")}/>
          <label> Select all rarities</label>
          <input type="checkbox" onChange={() => checkAll("rarity")}/>
          <br/>
          <button className="settings-button" onClick={handlePath}> Go to profile </button>
          <button className="settings-button" onClick={reFetchData}> Re-fetch data </button>
         <FilterMenu region={region} setFormData={setFormData} formData={formData}/>
      </div>
    )
};

export default SettingsMenu;
