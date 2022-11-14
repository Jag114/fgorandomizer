import { useNavigate } from "react-router-dom";
import "./UserServantList.css";
import ServantCard from "./ServantCard";
import FilterList from "./UserServantListFilters"
import useServantList from "../hooks/useServantList";

const UserServantList = ({region, setForceState}) => {
  const [ visible, setVisible ] = useServantList(false);
  const navigate = useNavigate();

  const handlePath = () => {
    navigate("/");
  };
  
  const servantCardsData = JSON.parse(localStorage.getItem(`servantsData-${region}`));

  const servantCards = servantCardsData.map((e) => (
    <ServantCard
      key={e.collectionNo}
      id={e.collectionNo}
      name={e.name}
      className={e.className}
      rarity={e.rarity}
      region={region}
      setForceState={setForceState}
    />
  ));

  const checkAll = () => {
    let cards = document.getElementsByClassName("profile-servant-net-card");
    let profile = [...JSON.parse(localStorage.getItem(`userProfile-${region}`))];
    for (let card of cards) {
      if(profile.includes(card.id)){
        profile.splice(profile.indexOf(card.id), 1);
      }else{
        profile.push(card.id);
      }
    }
    localStorage.setItem(`userProfile-${region}`, JSON.stringify(profile));
    setForceState(prevForceState => !prevForceState);
  }

  const resetLocalStorage = () => {
    localStorage.setItem(`userProfile-${region}`, JSON.stringify([]));
    setForceState(prevForceState => !prevForceState);
  }

  const searchServant = (e) => {
    console.log(e.target.value);
  }

  return (
    <main>
      {visible === true ? <FilterList visible={visible} setVisible={setVisible} /> : null}
      <div className="profile-header">
        <p className="profile-header-text"> Total number of servants is: {servantCards.length}, current region: {region.toUpperCase()} </p>
        <p className="profile-header-text"> Servants in your profile: {JSON.parse(localStorage.getItem(`userProfile-${region}`)).length} </p>
        <button className="profile-change-path-button" onClick={handlePath}>
          Go back to randomizer
        </button>
      </div>
      <div className="profile-header-2">
        <label> Select all </label> 
        <input type="checkbox" name="selectAll" onChange={checkAll}/>
        <br/>
        <button onClick={resetLocalStorage}> RESET PROFILE </button>
        <input type="text" className="profile-search" onChange={searchServant}/>
        <button className="profile-filter" onClick={() => setVisible(prevVisible => !prevVisible)}> Filter </button>
      </div>
      <div className="profile-servant-net">
        {servantCards}
      </div>
      
    </main>
  );
};

export default UserServantList;
