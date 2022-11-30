import "./FilterMenu.css";
import rarityStarConverter from "../data/rarityStarConverter";

const FilterMenu = ({ region }) => {
  let classList = [
    "Saber",
    "Archer",
    "Lancer",
    "Rider",
    "Assassin",
    "Caster",
    "Berserker",
    "Ruler",
    "Avenger",
    "MoonCancer",
    "Foreigner",
    "Shielder",
    "AlterEgo",
  ];
  if (region === "jp") {
    classList.push("Pretender");
  }
  const rarityList = [0, 1, 2, 3, 4, 5];

  const rarityFilters = rarityList.map((e) => {
    return <div className="filter-menu-rarity"> {rarityStarConverter(e)} </div>;
  });

  const classFilters = classList.map((e) => {
    return <div className="filter-menu-class"> {e} </div>;
  });

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
        <button className="filter-menu-button"> Default </button>
        <button className="filter-menu-button"> Select All (Rarity) </button>
        <button className="filter-menu-button"> Select All (Class) </button>
        <button className="filter-menu-button"> OK </button>
      </div>
    </div>
  );
};

export default FilterMenu;
