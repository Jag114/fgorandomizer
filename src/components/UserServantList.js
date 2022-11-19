import { useNavigate } from "react-router-dom";
import "./UserServantList.css";
import ServantCard from "./ServantCard";
import FilterList from "./UserServantListFilters"
import { createContext, useState } from "react";
import useServantList from "../hooks/useServantList";

const UserServantList = ({region}) => {
  const [ visible, setVisible ] = useState(false);
  const navigate = useNavigate();
  const userContext = createContext();
  const [ userProfile, setUserProfile ] = useServantList(region);
  const [ filters, setFilters ] = useState({
    rarity: [],
    class: []
  });
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
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      show1={filters.rarity.length > 0 ? filters.rarity.includes(e.rarity) ? true : false : true} 
      show2={filters.class.length > 0 ? filters.class.includes(e.className[0].toUpperCase() + e.className.substring(1)) ? true : false : true} 
      /*  show1:
          if(filters.rarity.length > 0){
            if(filter.rarity.includes(e.rarity)){
              return true
            }else{
              return false
            }
          }else{
          }
          show2: 
          the same, e.className[0].toUpperCase() + e.className.substring(1), needed cuz of
          difference between e.g Saber and saber
      */
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
    setUserProfile(profile);
  }

  const resetUserProfile = () => {
    setUserProfile([]);
  }

  const searchServant = (e) => {
    console.log(e.target.value);
  }

  return (
    <main style={{position:"relative"}}>
      {visible === true ? 
      <userContext.Provider value={region}>
        <FilterList 
          userContext={userContext} 
          visible={visible} 
          setVisible={setVisible} 
          region={region}
          filters={filters}
          setFilters={setFilters}
        />
      </userContext.Provider>
       : 
      null}
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
        <button onClick={resetUserProfile}> RESET PROFILE </button>
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
