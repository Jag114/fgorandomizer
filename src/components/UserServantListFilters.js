import { useContext } from 'react';
import FilterCard from './FilterCard';
import './UserServantListFilters.css'

const FilterList = ({ visible, setVisible, userContext, filters, setFilters }) => {

  const region = useContext(userContext);
  const rarityList = [0,1,2,3,4,5];
  const classList = [
    "Saber", "Archer", "Lancer", 
    "Berserker", "Caster", "Assassin", "Rider",
    "Ruler", "Moon Cancer", "Avenger",
    "Alter Ego", "Foreigner", "Shielder"
  ]
  if(region === "jp"){
    classList.push("Pretender");
  }
  console.log(filters);
  const classCards = classList.map(e => {
    return (
      <FilterCard 
        key={e} 
        data={e}
        id={e}
        filters={filters}
        setFilters={setFilters}
        type="class"
      />
    )
  })
  const rarityCards = rarityList.map((e,i) => {
    return (
      <FilterCard 
        key={i} 
        data={e}
        id={i}
        filters={filters}
        setFilters={setFilters}
        type="rarity"
      />
    )
  })

  return visible === true ? (
    <div className="user-profile-filter-list">
      <div className='user-profile-filter-list-rarity'>
        <h2> Rarity </h2>
        {rarityCards}
      </div>
      <div className='user-profile-filter-list-class'>
        <h2> Classes </h2>
        {classCards}
      </div>
      <button onClick={() => setVisible((prevVisible) => !prevVisible)} className='user-profile-filter-list-button'>
        X
      </button>
    </div>
  ) : null;
};

export default FilterList;
