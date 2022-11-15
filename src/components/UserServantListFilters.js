import { useContext } from 'react';
import './UserServantListFilters.css'

const FilterList = ({ visible, setVisible, userContext }) => {

  const region = useContext(userContext);

  return visible === true ? (
    <div className="user-profile-filter-list">
      <div className='user-profile-filter-list-rarity'>
        <p></p>
        <p> Rarity </p>
        <p></p>
        <p> 0 </p>
        <p> 1 </p>
        <p> 2 </p>
        <p> 3 </p>
        <p> 4 </p>
        <p> 5 </p>
      </div>
      <div className='user-profile-filter-list-class'>
        <p></p>
        <p> Classes </p>
        <p></p>
        <p> Saber </p>
        <p> Archer </p>
        <p> Lancer </p>
        <p> Berserker </p>
        <p> Caster </p>
        <p> Assassin </p>
        <p> Rider </p>
        <p> Ruler </p>
        <p> Moon Cancer </p>
        <p> Avenger </p>
        <p> Alter Ego </p>
        <p> Foreigner </p>
        {region === "jp" ? <p> Pretender </p> : null}
        <p> Shielder </p>
      </div>
      <button onClick={() => setVisible((prevVisible) => !prevVisible)} className='user-profile-filter-list-button'>
        X
      </button>
    </div>
  ) : null;
};

export default FilterList;
