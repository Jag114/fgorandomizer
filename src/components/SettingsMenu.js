import "./SettingsMenu.css";
import servantFetch from '../data/servantFetch';
import { useNavigate } from "react-router-dom";

let rarityArr = [];
let classArr = [];

const SettingsMenu = ({setFormData, region, setRegion}) => {
  let renderCounter = 0; //for strict mode

  const navigate = useNavigate();

  const handlePath = (e) => {
    e.preventDefault();
    if(!localStorage.getItem(`servantsData-${region}`)){
      servantFetch({rarity: [], className: []}, region).then(() => navigate("profile"));
    }
    else{
      navigate("profile");
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
      if(checkbox.checked === true){
        type === "rarity" ? rarityArr = [] : classArr = [];
        checkbox.checked = false;
      }else{
        type === "rarity" ? rarityArr.push(parseInt(checkbox.value)) : classArr.push(checkbox.value);
        checkbox.checked = true;
      }
    }
  }

    return (
      <div className="settings-menu">
        <form>
        <label className="switch">
          <input type="checkbox" onChange={changeServerData} checked={region === "na" ? false : true}/>
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
              {region === "jp" ? 
              <>
                <br />
                <input type="checkbox" className="settings-checkbox" onChange={handleChange} name="class" value="pretender"/>
                <label>Pretender</label> 
              </>
              : null}
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
          <br/>
          <label> Select all classes</label>
          <input type="checkbox" onChange={() => checkAll("class")}/>
          <label> Select all rarities</label>
          <input type="checkbox" onChange={() => checkAll("rarity")}/>
          <br/>
          <button className="settings-button" onClick={handlePath}> Go to profile </button>
          <button className="settings-button" onClick={reFetchData}> Re-fetch data </button>
        </form>
      </div>
    )
};

export default SettingsMenu;
