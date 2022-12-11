import "./FilterMenu.css";
import rarityStarConverter from "../data/rarityStarConverter";
import checkDuplicates from "../data/checkDuplicatesInArr";
import removeSpaceFromString from "../data/removeSpacesFromString";
import capitalizeString from "../data/capitalizeString";

let rarityArr = [];
let classArr = [];

const FilterMenu = ({ region, formData, setFormData }) => {

  let renderCounter = 0; //for strict mode
  const handleClick = (event) => {
    let { name, value } = event.target;
    value = removeSpaceFromString(value);
    switch (name) {
      case "rarity":
        setFormData(prevFormData => {
            if(!prevFormData.rarity.includes(parseInt(value))){
              rarityArr.push(parseInt(value));
            }
            else{
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
            classArr.push(value);
          }
          else{
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
  console.log(formData);
  let classList = [
    "saber",
    "archer",
    "lancer",
    "rider",
    "assassin",
    "caster",
    "berserker",
    "ruler",
    "avenger",
    "moon Cancer",
    "foreigner",
    "shielder",
    "alter Ego",
  ];
  if (region === "jp") {
    classList.push("Pretender");
  }
  const rarityList = [0, 1, 2, 3, 4, 5];

  const rarityFilters = rarityList.map((e) => {
    return (
      <button 
        key={e} 
        className="filter-menu-rarity"
        onClick={handleClick} 
        value={e} 
        name="rarity"> 
        {rarityStarConverter(e)} 
      </button>
    ) 
          
  });

  const classFilters = classList.map((e,i) => {
    return (
      <button 
        key={i} 
        className="filter-menu-class" 
        onClick={handleClick} 
        value={e} 
        name="class"> 
        {capitalizeString(e)} 
      </button>
    )
  });

  const hideMenu = () => {
    console.log("Hidden");
  }

  return (
    <div className="filter-menu-container">
      <div className="filter-menu-rarity-list">
        <h1> Rarity </h1>
        {rarityFilters}
      </div>
      <hr></hr>
      <div className="filter-menu-class-list">
        <h1> Class </h1>
        {classFilters}
      </div>
      <div className="filter-menu-button-container">
        <button className="filter-menu-button" onClick={() => setFormData({rarity:[], className:[]})}> Default </button>
        <button className="filter-menu-button"> Select All (Rarity) </button>
        <button className="filter-menu-button"> Select All (Class) </button>
        <button className="filter-menu-button" onClick={hideMenu}> OK </button>
      </div>
    </div>
  );
};

export default FilterMenu;
